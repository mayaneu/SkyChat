from fastapi import APIRouter, WebSocket
import asyncio
import json

from .drone_service import listen_for_telemetry, connection, command_on_drone

router = APIRouter(
    prefix="/drone",
    tags=["drone"],
    responses={404: {"description": "Not found"}},
)

async def handle_commands(websocket):
    while True:
        data = await websocket.receive_text()
        command = json.loads(data)
        command_on_drone(command)

async def handle_telemetry(websocket, connection):
    telemetry_data = {
            "latitude": None,
            "longitude": None,
            "altitude": None,
            "speed": None,
            "is_armed": None,
            "battery": None
    }
    while True:
        msg = connection.recv_match(blocking=True, timeout=1)
        if msg:
            listen_for_telemetry(msg, telemetry_data)
            await websocket.send_json(telemetry_data)
        await asyncio.sleep(0.1)  # Control the rate of telemetry updates

@router.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    consumer_task = asyncio.create_task(handle_commands(websocket))
    producer_task = asyncio.create_task(handle_telemetry(websocket, connection))
    await asyncio.gather(consumer_task, producer_task)
        
