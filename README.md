# SkyChat

**SkyChat** is a platform designed for glider pilots in sambusak hovercraft, facilitating communication through a specialized chat interface and providing real-time telemetry via a drone dashboard. This solution is crafted to minimize the actions required by users, allowing them to focus on their flight and communication.

## Features

### The Chat
- **Real-time Communication**: Built with WebSocket for live interaction.
- **User Authentication**: Supports signup, signin, and logout functionalities.
- **Active User Display**: See who's online at a glance.
- **Message Utilities**: Send and receive messages instantly.

### The Drone Dashboard
- **Live Telemetry**: View real-time data from your drone.
- **Command Transmission**: Send commands to your drone directly through the interface.
- **WebSocket Integration**: Ensures that all telemetry data is up-to-date and transmitted in real-time.
- **Pymavlink**: Utilizes pymavlink for effective communication with drones.

login
![SkyChat Interface](image.png)

signup
![alt text](image-1.png)

chat
![alt text](image-2.png)

drone dashboard
![alt text](image-3.png)

## Roadmap for Future Enhancements

Given more development time, several features and improvements are planned:

- **WebSocket Scaling**: Integrate Redis to manage socket connections across multiple pods in environments like OpenShift, addressing statefulness issues.
- **Enhanced Security**: Shift from localStorage to server-side storage using cookies for JWT and refresh tokens.
- **Data Management**: Implement pagination for efficient data fetching.
- **Read Receipts**: Add message read/unread status to enhance user communication.
- **Group Messaging**: Enable users to create and communicate within groups.
- **Quick Messages**: Allow sending of common phrases through one-click actions.
- **Advanced Drone Dashboard**: Redesign the dashboard to provide more comprehensive drone data.
- **Feedback System**: Implement success and error snackbars for immediate user feedback.

## Setup Instructions

### Prerequisites
- Python installed on your machine.
- `.env` file set up (refer to `example.env` for setup).

### mongodb setup
1. Download MongoDB from [MongoDB Community Download](https://www.mongodb.com/try/download/community).
2. Install MongoDB using the wizard.
3. Download and extract the MongoDB Shell from [MongoDB Shell Download](https://www.mongodb.com/try/download/shell).
4. Add the MongoDB Shell bin directory to your environment's PATH.
5. Edit the MongoDB config file to add a replica set:
```bash
replication:
  replSetName: "my-rs"
```
6. Restart the MongoDB service.
7. Initialize the replica set:
```bash
mongosh
rs.initiate()
```
8. add to the connection string the name you gave to your replicaset

### Simulator setup
- If using Windows, download WSL.
- Open Ubuntu terminal and set up the ArduPilot simulator

```bash
git clone https://github.com/ArduPilot/ardupilot.git
cd ardupilot/
git fetch --tags
git checkout tags/Copter-4.4.4
git submodule update --init --recursive
Tools/environment_install/install-prereqs-ubuntu.sh -y
. ~/.profile
cd ArduCopter
sim_vehicle.py -w
sim_vehicle.py --console --map
```

### Setup
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload

cd ../client
npm i
npm run start
