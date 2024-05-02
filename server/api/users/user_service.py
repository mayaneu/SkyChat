import motor.motor_asyncio
from .user_model import UserPostDto
from auth.auth_service import pwd_context
from bson import ObjectId

async def save_user(db: motor.motor_asyncio.AsyncIOMotorDatabase,user: UserPostDto):
    user_doc = dict(user)
    user_doc["is_connected"] = True
    user_doc["password"] = pwd_context.hash(user.password)
    insert_message = await db['users'].insert_one(user_doc)
    return insert_message.inserted_id

async def get_connected_users(db: motor.motor_asyncio.AsyncIOMotorDatabase):
    cursor = db['users'].find({"is_connected": True})
    users = await cursor.to_list(length=1000)
    return users

async def set_user_not_connected(db: motor.motor_asyncio.AsyncIOMotorDatabase,user_id: str): 
    db['users'].update_one({"_id": ObjectId(user_id)}, {"$set": {"is_connected": False}})
    
async def set_user_connected(db: motor.motor_asyncio.AsyncIOMotorDatabase,user_id: str): 
    db['users'].update_one({"_id": ObjectId(user_id)}, {"$set": {"is_connected": True}})