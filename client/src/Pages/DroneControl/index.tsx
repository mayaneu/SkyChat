import React from 'react';
import { Box, Typography, Paper, createTheme } from '@mui/material';
import { Brightness4 as Brightness4Icon, FlightTakeoff, FlightLand } from '@mui/icons-material';
import useWebSocket from 'react-use-websocket';

import ColumnContainer from '../../Layout/ColumnContainer';
import Button from '../../Components/Button';
import Page from '../Components/Page';


const DroneDashboard = () => {
    const [telemetry, setTelemetry] = React.useState({
        latitude: 0,
        longitude: 0,
        altitude: 0,
        battery: 100,
        speed: 0,
        is_armed: false
    });

    // WebSocket connection setup
    const { sendJsonMessage } = useWebSocket('ws://localhost:8000/drone/ws', {
        onOpen: () => console.log('Connection opened!'),
        onClose: () => console.log('Connection closed!'),
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => {
            const data = JSON.parse(event.data);
            setTelemetry(data);
        }
    });

    const handleArm = () => {
        sendJsonMessage({ command: 'arm' });
    };

    const handleTakeoff = () => {
        sendJsonMessage({ command: 'takeoff', altitude: 10 });
    };

    const handleLand = () => {
        sendJsonMessage({ command: 'land' });
    };

    return (
        <Page>
        <ColumnContainer>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{color: 'white'}}>
                    Drone Telemetry Dashboard
                </Typography>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="body1">Latitude: {telemetry.latitude}</Typography>
                    <Typography variant="body1">Longitude: {telemetry.longitude}</Typography>
                    <Typography variant="body1">Altitude: {telemetry.altitude}</Typography>
                    <Typography variant="body1">Battery: {telemetry.battery}%</Typography>
                    <Typography variant="body1">Speed: {telemetry.speed} m/s</Typography>
                    <Typography variant="body1">Armed: {telemetry.is_armed ? 'Yes' : 'No'}</Typography>
                </Paper>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button onClick={handleArm}>
                        Arm
                    </Button>
                    <Button onClick={handleTakeoff}>
                        Takeoff
                    </Button>
                    <Button onClick={handleLand}>
                        Land
                    </Button>
                </Box>
            </Box>
        </ColumnContainer>
        </Page>
    );
}

export default DroneDashboard;
