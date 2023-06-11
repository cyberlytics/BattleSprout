import {
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,
    IconButton,
    Tooltip,
} from '@mui/material';
import { MenuTile } from './components/MenuTile';
import {
    AddCircleOutlined,
    Delete,
    FormatListNumbered,
    GroupAdd,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Hauptmenü des Spiels. Von hier aus soll der Nutzer überall hinkommen.
export const MainMenu = () => {
    const [openJoinDialog, setOpenJoinDialog] = useState(false);
    const [joinText, setJoinText] = useState('');

    function handleOpenJoinDialog() {
        setOpenJoinDialog(true);
    }

    function handleCloseJoinDialog() {
        setOpenJoinDialog(false);
        clearJoinText();
    }

    function submitJoinGame() {
        //TODO: submit Text

        handleCloseJoinDialog();
    }

    function clearJoinText() {
        setJoinText('');
    }

    const navigate = useNavigate();

    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h3'>
                        {'Herzlich willkommen zu BattleSprout!'}
                    </Typography>
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={AddCircleOutlined}
                        title='Spiel erstellen'
                        content='Erstelle ein Spiel, dem ein anderer beitreten kann'
                        action={() => navigate('/createGame')}
                    />
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={GroupAdd}
                        title='Spiel beitreten'
                        content='Tritt einem Spiel bei'
                        action={() => handleOpenJoinDialog()}
                    />
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <MenuTile
                        icon={FormatListNumbered}
                        title='Rangliste'
                        content='Sehe dir deine und andere Statistiken an'
                        action={() => navigate('/leaderBoard')}
                    />
                </Grid>
            </Grid>

            <Dialog
                open={openJoinDialog}
                onClose={handleCloseJoinDialog}
                fullWidth
            >
                <DialogTitle>{'Spiel beitreten'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {'Geben Sie die Adresse zum Beitreten an: '}
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin='dense'
                        label='Adresse'
                        fullWidth
                        variant='standard'
                        value={joinText}
                        onChange={(e) => setJoinText(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <Tooltip title={'Löschen'}>
                                    <IconButton onClick={clearJoinText}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseJoinDialog} variant='outlined'>
                        {'Abbrechen'}
                    </Button>
                    <Button onClick={submitJoinGame} variant='contained'>
                        {'Beitreten'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
