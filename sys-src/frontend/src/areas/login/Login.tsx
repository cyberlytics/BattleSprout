import React from 'react';
import {
    Checkbox,
    Grid,
    TextField,
    FormControlLabel,
    Button,
    Typography,
    InputAdornment,
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

//import db from './../../../../backend/src/db';

//Login ist das erste, was der Nutzter sieht, wenn er die Website aufruft
export const Login = () => {
    const [Password, setPasswort] = React.useState('');
    const [Username, setUsername] = React.useState('');
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event: {
        target: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
        setChecked(event.target.checked);
    };

    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue} />
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
                                Bitte melde dich an!
                            </Typography>
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <TextField
                                onChange={handleUsernameChange}
                                label='Benutzername'
                                style={{ background: '#bbd8b1' }}
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
                                style={{ background: '#bbd8b1' }}
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
                                    />
                                }
                                label='Account merken'
                            />
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <Button
                                onClick={CheckLoginData}
                                fullWidth
                                style={{
                                    background: '#bbd8b1',
                                    color: 'black',
                                    width: '110px',
                                    height: '50px',
                                }}
                            >
                                Anmelden
                            </Button>
                        </Grid>
                        <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                            <Typography>
                                Noch kein Account? Jetzt
                                <Button href=''>registrieren!</Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );

    function handlePasswordChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setPasswort(event.target.value);
    }

    function handleUsernameChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setUsername(event.target.value);
    }

    function CheckLoginData() {
        var query = {
            $and: [
                {
                    'Usercredentails.password': Password,
                },
                {
                    'Usercredentails.username': Username,
                },
            ],
        };

        //Connect to DB
        // db.connect()

        //var test = db.FindOne('Usercredentials', 'Usercredentials', query)
        //console.log(test)
    }
};
