import {
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
import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
    openJoinDialog: boolean;
    handleCloseJoinDialog: Function;
}

//Hauptmenü des Spiels. Von hier aus soll der Nutzer überall hinkommen.
export const JoinGameDialog = (props: IProps) => {
    const { openJoinDialog, handleCloseJoinDialog } = props;

    const [joinText, setJoinText] = useState('');

    const navigate = useNavigate();

    function closeDialog() {
        handleCloseJoinDialog();
        clearJoinText();
    }

    function submitJoinGame() {
        const link = '/GameField/' + joinText;
        navigate(link);
        handleCloseJoinDialog();
    }

    function clearJoinText() {
        setJoinText('');
    }

    return (
        <Dialog open={openJoinDialog} onClose={closeDialog} fullWidth>
            <DialogTitle>{'Spiel beitreten'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {'Geben Sie die Game ID zum Beitreten an: '}
                </DialogContentText>

                <TextField
                    autoFocus
                    margin='dense'
                    label='Game ID'
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
                <Button onClick={closeDialog} variant='outlined'>
                    {'Abbrechen'}
                </Button>
                <Button onClick={submitJoinGame} variant='contained'>
                    {'Beitreten'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
