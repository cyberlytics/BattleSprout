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
import {
    AccountCircle,
    Lock,
} from '@mui/icons-material'
import background from './../../assets/background.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



//Login ist das erste, was der Nutzter sieht, wenn er die Website aufruft
export const Login = () => {
    const [password, setPasswort] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [checked, setChecked] = React.useState(true);
    const navigate = useNavigate();
    const handleChange = (event: {
        target: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
        setChecked(event.target.checked);
    };

    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;


    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){        
        setPasswort(event.target.value);
        
    }
    

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setEmail(event.target.value);
  }

  async function CheckLoginData(){
        try
        {
            const url = "http://localhost:3000/api/login";
            const { data: res } = await axios.post(url, {email,password});
            localStorage.setItem("token", res.data);
            navigate('/my/MainMenu')            
        }
        catch (error)
        {
            console.log(error)
        }    
    }

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
                                style={{ background: '#bbd8b1'}}
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
                                type="password"
                                value={password}
                                style={{ background: '#bbd8b1'}}
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
                                <Button style={{color: 'blue'}}
                                    href='/signup'>
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
