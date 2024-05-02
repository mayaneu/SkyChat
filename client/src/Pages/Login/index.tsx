import { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../Components/Button';
import { useAuth } from '../../Providers/AuthProvider'; // Import useAuth from the location where it's defined
import ColumnContainer from '../../Layout/ColumnContainer';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Use the login method provided by the AuthProvider
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const userId = await login(username, password);
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
                    gap: '20px'
                }}
            >
                <Typography sx={{ color: 'text.primary', fontWeight: 'bold' }} component="h1" variant="h5">
                    Log In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                    login
                </Button>
                <Link to='/signup'>
                    <Button>
                        signup
                    </Button>
                </Link>
            </Box>
        </ColumnContainer >
    );
};

export default LoginPage;
