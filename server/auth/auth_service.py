from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from dotenv import load_dotenv
import os

from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
import motor.motor_asyncio
from dbs.mongodb import database

load_dotenv()

secret_key = os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_MINUTES = int(os.getenv("REFRESH_TOKEN_EXPIRE_MINUTES"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def get_user(db: motor.motor_asyncio.AsyncIOMotorDatabase,username: str):
   user = await db["users"].find_one({"username": username})
   return user

async def authenticate_user(username: str, password: str):
    user = await get_user(database, username)
    if not user or not verify_password(password, dict(user)['password']):
        return False
    return user

def create_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)
    return encoded_jwt

def create_access_token(username: str):
    return create_token(data={"sub": username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

def create_refresh_token(username: str):
    return create_token(data={"sub": username}, expires_delta=timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))

def decode_token(token: str):
    try:
        decoded_token = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        return decoded_token if decoded_token['exp'] > datetime.utcnow().timestamp() else None
    except jwt.JWTError:
        return None
    
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise FileNotFoundError
        user = await database["users"].find_one({"username": username})
        if user is None:
            raise FileNotFoundError
        return user
    except JWTError:
        raise FileNotFoundError