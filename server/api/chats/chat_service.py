import motor.motor_asyncio
from bson import ObjectId

from ..messages.message_model import MessageChatsPostDto

def get_pipeline(user_id: str):
    return [
        {
            "$match": {
                "participants": ObjectId(user_id)  # Filter chats where user_id is in participants array
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "participants",
                "foreignField": "_id",
                "as": "participants"
            }
        },
        {
            "$lookup": {
                "from": "messages",  # Name of the collection to join with
                "localField": "last_message",  # Field in current collection
                "foreignField": "_id",  # Field in messages collection
                "as": "last_message"  # Name of the field to add with the joined documents
            }
        },
        {
            "$unwind": "$last_message"  # Unwind the message array created by $lookup
        },
        {
           "$sort": {
            "last_message.date": -1
        }
        }
    ]

async def get_chats_by_user(
    db: motor.motor_asyncio.AsyncIOMotorDatabase, user_id: str
) -> bool:
    chats_pipline = get_pipeline(user_id)
    cursor = db["chats"].aggregate(chats_pipline)

    chats = await cursor.to_list(length=None)
    
    return chats
    
async def save_new_chat(db: motor.motor_asyncio.AsyncIOMotorDatabase, chat: MessageChatsPostDto, session: motor.motor_asyncio.AsyncIOMotorClientSession):
   new_chat = dict(chat)
   participants_ids = [ObjectId(id) for id in new_chat["participants"]]
   new_chat["participants"] = participants_ids
   chat_id = await db["chats"].insert_one(new_chat, session=session)
   return chat_id.inserted_id