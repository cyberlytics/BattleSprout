import React from 'react';
import {
    Checkbox,
    Grid,
    TextField,
    FormControlLabel,
    Paper,
    Button,
} from '@mui/material';

//Login ist das erste, was der Nutzter sieht, wenn er die Website aufruft
export const Login = () => {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event: {
        target: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
        setChecked(event.target.checked);
    };
    return (
        <div
            style={{
                padding: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper style={{ padding: 50, background: '#d6e7d0' }}>
                <Grid
                    container
                    spacing={3}
                    direction={'column'}
                    alignItems={'center'}
                >
                    <h1>Login</h1>
                    <Grid item xs={12}>
                        <TextField
                            label='Username'
                            style={{ background: '#bbd8b1' }}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Password'
                            style={{ background: '#bbd8b1' }}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{
                                        'aria-label': 'primary checkbox',
                                    }}
                                    style={{ color: '#add0a2' }}
                                />
                            }
                            label='Keep me logged in'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            style={{ background: '#bbd8b1', color: 'black' }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};
