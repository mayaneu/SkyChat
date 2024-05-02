from pymavlink import mavutil
from dotenv import load_dotenv
import os

load_dotenv()

drone_connection_url = os.getenv("DRONE_CONNECTION_URL")

connection = mavutil.mavlink_connection(drone_connection_url)
connection.wait_heartbeat()

print('connected')

def set_guided_mode(connection):
    connection.mav.set_mode_send(
        connection.target_system,
        mavutil.mavlink.MAV_MODE_FLAG_CUSTOM_MODE_ENABLED,
        connection.mode_mapping()['GUIDED']
    )

set_guided_mode(connection)

def listen_for_telemetry(msg, data):
    if msg.get_type() == 'GPS_RAW_INT':
        data["latitude"] = msg.lat / 1e7
        data["longitude"] = msg.lon / 1e7
        data["altitude"] = msg.alt / 1000.0

    elif msg.get_type() == 'VFR_HUD':
        data["speed"] = msg.airspeed

    elif msg.get_type() == 'HEARTBEAT':
        data["is_armed"] = msg.base_mode & mavutil.mavlink.MAV_MODE_FLAG_SAFETY_ARMED

    elif msg.get_type() == 'SYS_STATUS':
        data["battery"] = msg.battery_remaining

def command_on_drone(command):
    if 'command' in command:
        if command['command'] == 'arm':
            print('arm')
            arm_vehicle()

        elif command['command'] == 'takeoff':
            takeoff()

        elif command['command'] == 'send_attitude_target':
            send_attitude_target()
            
        elif command['command'] == 'land':
            print("Landing the drone...")
            land_vehicle()

        else:
            print('unknown')
        
def arm_vehicle():
    connection.mav.command_long_send(
        connection.target_system,
        connection.target_component,
        mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,
        0, 
        1, 
        0, 0, 0, 0, 0, 0 
    )
    return {"status": "command sent"}

def takeoff():
    altitude = 10.0  
    connection.mav.command_long_send(
        connection.target_system,
        connection.target_component,
        mavutil.mavlink.MAV_CMD_NAV_TAKEOFF,
        0, 
        0, 
        0, 0, 0,  
        0, 0, 
        altitude 
    )
    return {"status": "takeoff command sent"}

def send_attitude_target(roll_angle, pitch_angle, yaw_angle, thrust):
    type_mask = (1<<0 | 1<<1 | 1<<2 | 1<<4 | 1<<6)

    msg = connection.mav.set_attitude_target_encode(
        0, 
        connection.target_system,
        connection.target_component,
        type_mask,
        mavutil.mavlink.quaternion_from_euler(roll_angle, pitch_angle, yaw_angle),  # Quaternion
        0, 0, 0, 
        thrust
    )
    connection.mav.send(msg)
    return {"status": "change atitudes command is being send"}

def land_vehicle():
    connection.mav.command_long_send(
        connection.target_system,  # target_system
        connection.target_component,  # target_component
        mavutil.mavlink.MAV_CMD_NAV_LAND,  # command
        0, 
        0, 0, 0, 0, 
        0, 0,
        0 
    )
    return {"status": "land command sent"}
