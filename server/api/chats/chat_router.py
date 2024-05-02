from fastapi import APIRouter, Depends

from dbs.mongodb import database
from .chat_service import get_chats_by_user
from .chats_model import ChatsCollection
from ..users.user_model import UserModel
from auth.auth_service import get_current_user

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
    responses={404: {"description": "Not found"}},
)

@router.get("/",
            response_model= ChatsCollection)
async def get_chat(user_document: UserModel = Depends(get_current_user)):
    current_user = UserModel(**user_document)
    chats = await get_chats_by_user(database, current_user.id)
    
    return {"chats": chats}