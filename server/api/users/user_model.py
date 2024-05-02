from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from typing import Annotated, List
from pydantic import BeforeValidator, ConfigDict

PyObjectId = Annotated[str, BeforeValidator(str)]

class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(validation_alias="_id", default=None)
    fullname: str = Field(...)
    username: str = Field(...)
    password: str = Field(...),
    isConnected: bool = Field(validation_alias="is_connected")
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "name": "Jane Doe",
                "email": "jdoe@example.com",
                "course": "Experiments, Science, and Fashion in Nanophotonics",
                "gpa": 3.0,
            }
        },
    )
    
class UserPostDto(BaseModel):
    fullname: str = Field(...)
    username: str = Field(...)
    password: str = Field(...),
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )     

class UserCollection(BaseModel):
    users: List[UserModel]