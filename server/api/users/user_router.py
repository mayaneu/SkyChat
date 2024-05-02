from fastapi import APIRouter
from datetime import datetime

from dbs.mongodb import database
from .user_model import UserCollection
from .user_service import get_connected_users

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.get("/connected",
            response_model= UserCollection)
async def get_connected():
    connected_users = await get_connected_users(database)
    
    return {"users": connected_users}