from fastapi import APIRouter, Depends
from datetime import datetime

from dbs.mongodb import database
from .message_service import get_messgaes_by_chat, save_new_message, get_message_by_id
from .message_model import MessageCollection, MessagePostDto, MessageModel
from ..users.user_model import UserModel
from auth.auth_service import get_current_user
from ws.ws_router import manager

router = APIRouter(
    prefix="/messages",
    tags=["messgaes"],
    responses={404: {"description": "Not found"}},
)

@router.get("/{chat_id}",
            response_model= MessageCollection)
async def get_messages(chat_id: str):
    messages = await get_messgaes_by_chat(database, chat_id)
    
    return {"messages": messages}

@router.post("/")
async def create_message(message_data: MessagePostDto, user_document: UserModel = Depends(get_current_user)):
    current_user = UserModel(**user_document)
    new_message_id = await save_new_message(database, message_data, current_user)
    message_document = await get_message_by_id(database,new_message_id)
    populated_message = MessageModel(**message_document)
    await manager.broadcast(populated_message.model_dump_json())
    
    return str(new_message_id)