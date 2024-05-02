
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

database_url = os.getenv("DATABASE_URL")

client = AsyncIOMotorClient(database_url)
database = client["skyChat"]
users_collection = database["users"]