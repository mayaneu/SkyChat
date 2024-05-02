import { useState } from 'react';
import { TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider'; // Import useAuth from the location where it's defined
import ColumnContainer from '../../Layout/ColumnContainer';
import { useWs } from '../Home/Providers/wsProvider';
import Button from '../../Components/Button';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [fullname, setfullname] = useState('');
    const [password, setPassword] = useState('');
    const { signin } = useAuth();
    const navigate = useNavigate();

    const { sendMessage } = useWs()

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const userId = await signin(fullname, username, password);
        sendMessage(JSON.stringify({ userId }))
        navigate('/')
    };

    return (
        <ColumnContainer sx={{ width: '100%', height: '100%', backgroundColor: 'background.default' }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ color: 'text.primary', fontWeight: 'bold' }} component="h1" variant="h5">
                    Signup
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="fullname"
                        name="fullname"
                        autoComplete="fullname"
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <Button onClick={handleSubmit}>
                    signup
                </Button>
            </Box>
        </ColumnContainer >
    );
};

export default SignupPage;
