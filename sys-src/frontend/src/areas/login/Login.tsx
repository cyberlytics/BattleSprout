import React from 'react';
import {
    Checkbox,
    Grid,
    TextField,
    FormControlLabel,
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
export const Login = () => {
    const [password, setPasswort] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [checked, setChecked] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();
    const handleChange = (event: {
        target: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
        setChecked(event.target.checked);
    };

    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    function handlePasswordChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setPasswort(event.target.value);
    }

    function handleEmailChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setEmail(event.target.value);
    }

    async function CheckLoginData() {
        try {
            const url = SERVER_URL + '/api/login';
            const { data: res } = await axios.post(url, { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.user);
            navigate('/');
            window.location.reload();
        } catch (error) {
            alert('Email oder Benutzername falsch');
        }
    }

    async function handleLoginButtonClick() {
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
                            background: 'rgba(52,52,52,0.1)',
                        }}
                    >
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <Typography variant='h4' gutterBottom>
                                Bitte melde dich an!
                            </Typography>
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <TextField
                                onChange={handleEmailChange}
                                label='Email'
                                value ={email}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        style={{ color: '#add0a2' }}
                                        disabled={loading}
                                    />
                                }
                                label='Account merken'
                            />
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <Button
                                onClick={handleLoginButtonClick}
                                fullWidth
                                disabled={loading}
                                color='primary'
                                variant='contained'
                            >
                                {loading ? <CircularProgress /> : 'Anmelden'}
                            </Button>
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <Typography>
                                Noch kein Account? Jetzt
                                <Button
                                    style={{ color: 'blue' }}
                                    onClick={() => navigate('/signup')}
                                    disabled={loading}
                                >
                                    registrieren!
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
