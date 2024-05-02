from fastapi import APIRouter, HTTPException

from .chats.chat_router import router as chats_router
from .messages.message_router import router as messages_router
from .users.user_router import router as users_router

router = APIRouter(
    prefix="/api"
)

router.include_router(chats_router)
router.include_router(messages_router)
router.include_router(users_router)
