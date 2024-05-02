import motor.motor_asyncio
import datetime
from bson import ObjectId
from .message_model import MessagePostDto, MessageModel, MessageWithUserPostDto, MessageChatsPostDto
from ..chats.chat_service import save_new_chat
from ..users.user_model import UserModel
from dbs.mongodb import client

def get_one_pipeline(message_id):
        return [
        {
            "$match": {
                "_id": ObjectId(message_id)  # Filter chats where user_id is in participants array
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "author",
                "foreignField": "_id",
                "as": "author"
            }
        },
        {
            "$unwind": "$author"  # Unwind the message array created by $lookup
        }
    ]

def get_pipeline(chat_id:str):
        return [
        {
            "$match": {
                "chat": ObjectId(chat_id)  # Filter chats where user_id is in participants array
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "author",
                "foreignField": "_id",
                "as": "author"
            }
        },
        {
            "$unwind": "$author"  # Unwind the message array created by $lookup
        },
        {
        "$sort": {
            "date": -1  # Sort by the date field in descending order (-1)
        }
    }
    ]


async def get_messgaes_by_chat(
    db: motor.motor_asyncio.AsyncIOMotorDatabase, chat_id: str
) -> bool:
    messages_pipline = get_pipeline(chat_id)
    cursor = db["messages"].aggregate(messages_pipline)

    messages = await cursor.to_list(length=None)
    if messages:
        return messages
    else:
        raise RuntimeError(messages)
    
async def get_message_by_id(db: motor.motor_asyncio.AsyncIOMotorDatabase, id: str)-> MessageModel:
    message_pipline = get_one_pipeline(id)
    cursor = db["messages"].aggregate(message_pipline)
    messages = await cursor.to_list(length=1)
    return messages[0]

def is_new_chat(message: MessagePostDto):
    return isinstance(message.chat, str)

def add_user_to_message(message: MessagePostDto, user: UserModel):
    if not is_new_chat(message):
        new_participants = message.chat.participants.copy() 
        new_participants.append(user.id) 
        chat = MessageChatsPostDto(participants=new_participants)   
    else: 
        chat = message.chat
    message_with_user = MessageWithUserPostDto(author= user.id, text=message.text, chat=chat)

    return message_with_user

async def insert_message(
    db: motor.motor_asyncio.AsyncIOMotorDatabase,
    session: motor.motor_asyncio.AsyncIOMotorClientSession ,
    message: MessageWithUserPostDto
) -> str: 
    message_doc = dict(message)
    message_doc["date"] = datetime.datetime.now()
    message_doc["author"] = ObjectId(message.author)
    if is_new_chat(message):
        message_doc["chat"] = ObjectId(message.chat)
    else:
        message_doc["chat"] = await save_new_chat(db,message_doc["chat"], session=session)
    insert_message = await db['messages'].insert_one(message_doc, session=session)
    await db['chats'].update_one({"_id": message_doc["chat"]},
                                  {"$set": {"last_message": insert_message.inserted_id}}, session=session)
    
    return str(insert_message.inserted_id)

async def save_new_message(db: motor.motor_asyncio.AsyncIOMotorDatabase, messgae: MessagePostDto, current_user: UserModel) -> str: 
     async with await client.start_session() as session:
       return await session.with_transaction(
          lambda a: insert_message(db, session , add_user_to_message(messgae,current_user)))