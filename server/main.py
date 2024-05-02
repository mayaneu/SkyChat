from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ws.ws_router import router as websocket_router
from auth.auth_router import router as auth_router
from api.api import router as api_router
from drone.drone_router import router as drone_router

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
app.include_router(websocket_router)
app.include_router(auth_router)
app.include_router(drone_router)