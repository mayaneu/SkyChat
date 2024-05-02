from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from .auth_service import authenticate_user, create_access_token, create_refresh_token, get_user, decode_token, get_current_user
from api.users.user_model import UserPostDto, UserModel
from api.users.user_service import save_user
from jose import JWTError
from dbs.mongodb import database
from pydantic import BaseModel

router = APIRouter()

class RefreshPayload(BaseModel):
   refresh_token: str

@router.post("/signin")
async def signin_user(user_dto: UserPostDto):
    user = dict(user_dto)
    id = await save_user(database, user_dto)
    user_doc = await database["users"].find_one({"_id": id})
    serliazed_user = UserModel(**user_doc)
    access_token = create_access_token(user["username"])
    refresh_token = create_refresh_token(user['username'])
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": serliazed_user
    }

@router.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    serliazed_user = UserModel(**user) 
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(serliazed_user.username)
    refresh_token = create_refresh_token(serliazed_user.username)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": serliazed_user
    }
   
@router.post("/refresh")
async def refresh_access_token(refetch_payload: RefreshPayload):
    try:
        payload = decode_token(refetch_payload.refresh_token)
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=400, detail="Invalid refresh token")
        user_document = await get_user(database, username)
        user = UserModel(**user_document)
        if user is None:
            raise HTTPException(status_code=400, detail="User not found")
        new_access_token = create_access_token(user.username)
        return {"access_token": new_access_token, "token_type": "bearer"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    

@router.get("/me", response_model=UserModel)
async def read_users_me(current_user: UserModel = Depends(get_current_user)):
    return current_user