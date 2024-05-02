from fastapi import  WebSocket, WebSocketDisconnect, APIRouter
from starlette.websockets import WebSocketState

import json

from api.users.user_service import set_user_connected, set_user_not_connected
from dbs.mongodb import database

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, user_id: str, websocket: WebSocket):
        self.active_connections[user_id] = websocket

    async def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            ws = self.active_connections[user_id]
            if not ws.client_state == WebSocketState.DISCONNECTED:
                await ws.close()
            del self.active_connections[user_id]

    async def broadcast(self, message: str):
        disconnected_users = []
        for user_id, websocket in list(self.active_connections.items()):
            try:
                await websocket.send_text(message)
            except WebSocketDisconnect:
                disconnected_users.append(user_id)
                print(f"Failed to send message to {user_id}, disconnecting.")

        for user_id in disconnected_users:
            print('hello')
            await self.disconnect(user_id)

manager = ConnectionManager()

@router.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    user_id = None
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received data: {data}")

            data_dict = json.loads(data)
            if 'userId' in data_dict:
                user_id = data_dict['userId']
                action = data_dict['action']
                if action == 'connected': 
                    await manager.connect(user_id, websocket)
                    await set_user_connected(database,user_id) 
                    print(f"Connected user ID: {user_id}")
                elif action =='disconnected':
                    await manager.disconnect(user_id)
                    await set_user_not_connected(database,user_id)
                    print(f"Disconnected user ID: {user_id}")

    except WebSocketDisconnect as e:
        print('disconnect')
        await set_user_not_connected(database,user_id)
        if user_id in manager.active_connections:
            manager.disconnect(user_id)