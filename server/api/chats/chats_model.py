from typing import Annotated, List, Optional

from pydantic import BeforeValidator, ConfigDict, BaseModel, Field

from ..users.user_model import UserModel
from ..messages.message_model import ChatMessageModel

PyObjectId = Annotated[str, BeforeValidator(str)]

class ChatModel(BaseModel):
    id: Optional[PyObjectId] = Field(validation_alias="_id", default=None)
    participants: List[UserModel]
    lastMessage: ChatMessageModel =  Field(validation_alias="last_message", default=None)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )    

class ChatsCollection(BaseModel):
    chats: List[ChatModel]