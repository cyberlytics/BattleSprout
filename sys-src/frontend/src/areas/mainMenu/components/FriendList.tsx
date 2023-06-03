import React from 'react';
import { useState } from 'react';
import {
    Grid,
    Button,
    Typography,
    TextField,
    List,
    ListItemText,
    ListItem,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItemAvatar,
    Avatar
} from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Face from '@mui/icons-material/Face';

interface IFriend {
    Name: string;
}

//FriendList Component
export const FriendList = () => {

    const xsValue = 12;
    const mdValue = 6;
    const lgValue = 4;

    //Maximale Anzahl an Freunden
    const MAX_flist = 10;

    //Dialog der nach dem Löschen eines Freundes erscheint
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [friend, setfriend] = useState<string>("");
    const [flist, setflist] = useState<IFriend[]>([]);

    const handleChange = (event: any): void => {
        setfriend(event.target.value);
    }

    //Fügt Freund zur Liste hinzu und prüft dabei die Eingabe
    const AddFriend = (event: any): void => {
        event.preventDefault();
        if(friend.length !== 0) {
            if(flist.length === MAX_flist){
                alert("Deine Freundesliste ist voll!")
            }
            else{
                for (let i = 0; i < flist.length; i++) {
                    if (flist[i].Name === friend) {
                        alert("Ihr seid schon befreundet!")
                        return
                    }
                }
                const newFriend = {Name: friend};
                setflist([...flist,newFriend]);
            }
        } else {
            alert("Es wurde nichts eingegeben!")
        }
    }

    return (
        <>
            <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                <Grid
                    container
                    spacing={1}
                    direction={'row'}
                    alignItems={'center'}
                    style={{
                        padding: 10,
                        background: 'rgba(52,52,52,0.1)'
                    }}
                >
                    <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                        <Typography 
                            variant="h6"
                            gutterBottom
                            >
                            Du hast {flist.length}/10 Freunde!
                        </Typography>
                    </Grid>
                    <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                        <TextField
                            placeholder='Name'
                            value={friend}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                        <Button
                            onClick={AddFriend}
                            fullWidth
                            style={{
                                background: '#bbd8b1',
                                color: 'black',
                                width: '120px',
                                height: '50px'
                            }}
                            >
                            Freund hinzufügen
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={xsValue} md={mdValue} lg={lgValue}>
                    <List sx={{ width: '100%', maxWidth: 360, background: '#bbd8b1', padding: 1}}>
                        {flist.map((value) => (
                            <ListItem
                                key={value.Name}
                                disableGutters
                                secondaryAction={
                                    <IconButton 
                                        aria-label="delete"
                                        onClick={() => {
                                            //Öffnet Info-Dialog
                                            handleClickOpen();
                                            //Entfernt Freund aus der Freundesliste
                                            const complete = (FriendToDelete: string): void => {
                                                setflist(flist.filter((friend) => {
                                                    return friend.Name !== FriendToDelete
                                                }))}
                                            complete(value.Name);
                                        }}
                                    >
                                        <Avatar style={{ backgroundColor: 'white'}}>
                                            <Delete color="primary" style={{ backgroundColor: 'white'}} />
                                        </Avatar>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: 'white'}}>
                                        <Face color="primary" style={{ backgroundColor: 'white'}} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`Name des Freundes: ${value.Name}`} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Freund entfernt"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Dein Freund wurde erfolgreich entfernt!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}