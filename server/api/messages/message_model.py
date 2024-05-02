from typing import Annotated, List, Optional, Union
from datetime import datetime

from pydantic import BeforeValidator, ConfigDict, BaseModel, Field

from ..users.user_model import UserModel
# from ..chats.chats_model import ChatsPostDto

PyObjectId = Annotated[str, BeforeValidator(str)]

class MessageModel(BaseModel):
    id: Optional[PyObjectId] = Field(validation_alias="_id", default=None)
    date: datetime = Field(...)
    text: str = Field(...)
    author: UserModel
    chat:PyObjectId = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

class ChatMessageModel(BaseModel):
    id: Optional[PyObjectId] = Field(validation_alias="_id", default=None)
    date: datetime = Field(...)
    text: str = Field(...)
    chat:PyObjectId = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )
    
class MessageChatsPostDto(BaseModel):
    participants: List[str] = Field(..., description="The IDs of the participants")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )


class MessagePostDto(BaseModel):
    text: str = Field(...)
    chat: Union[str, MessageChatsPostDto]  = Field(..., description="The ID of the author")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

class MessageWithUserPostDto(BaseModel):
    text: str = Field(...)
    author: str = Field(...) 
    chat: Union[str, MessageChatsPostDto]  = Field(..., description="The ID of the author")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )      

class Res(BaseModel): 
    id: str    

class MessageCollection(BaseModel):
    messages: List[MessageModel]