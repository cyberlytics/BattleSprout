import React from 'react';
import {
    Grid,
    TextField,
    Button,
    Typography,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../App';

//Login ist das erste, was der Nutzter sieht, wenn er die Website aufruft
export const Signup = () => {
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const [sndPassword, setSndPassword] = React.useState('');
    const navigate = useNavigate();

    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    function handlePasswordChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setPassword(event.target.value);
    }

    function handleSndPasswordChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setSndPassword(event.target.value);
    }

    function handleUsernameChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setUsername(event.target.value);
    }

    function handleEmailChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setEmail(event.target.value);
    }

    async function CheckLoginData() {
        if (password !== sndPassword) {
            alert('Eingegebene Passwörter stimmen nicht überein!');
            return;
        }

        if (password.length === 0) {
            alert('Geben Sie ein Passwort ein und bestätigen Sie es!');
            return;
        }

        if (sndPassword.length === 0) {
            alert('Bestätigen Sie das Passwort!');
            return;
        }
        try {
            const url = SERVER_URL + '/api/signup';
            const { data: res } = await axios.post(url, {
                email,
                password,
                username,
            });
            alert('Sie sind nun registiert.');
            navigate('Login');
        } catch (error) {
            alert(
                'Nutzer mit Email-Adresse ' + email + ' ist bereits vorhanden'
            );
        }
    }

    async function handleRegisterButtonClick() {
        setLoading(true);
        await CheckLoginData();
        setLoading(false);
    }

    return (
        <>
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <Grid
                        container
                        spacing={4}
                        direction={'column'}
                        alignItems={'center'}
                        style={{
                            padding: 50,
                            background: 'rgba(52,52,52,0.1',
                        }}
                    >
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <Typography variant='h4' gutterBottom>
                                Bitte registiere dich
                            </Typography>
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <TextField
                                onChange={handleEmailChange}
                                label='Email'
                                style={{ background: '#bbd8b1' }}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <TextField
                                onChange={handleUsernameChange}
                                label='Benutzername'
                                style={{ background: '#bbd8b1' }}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <TextField
                                onChange={handlePasswordChange}
                                label='Passwort'
                                type='password'
                                value={password}
                                style={{ background: '#bbd8b1' }}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <TextField
                                onChange={handleSndPasswordChange}
                                label='Passwort wiederholen'
                                type='password'
                                value={sndPassword}
                                style={{ background: '#bbd8b1' }}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <Button
                                onClick={handleRegisterButtonClick}
                                fullWidth
                                disabled={loading}
                                color='primary'
                                variant='contained'
                            >
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    'Registrieren'
                                )}
                            </Button>
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <Button
                                onClick={() => navigate('/signup/login')}
                                fullWidth
                                disabled={loading}
                                color='primary'
                                variant='outlined'
                            >
                                {'Zurück'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
