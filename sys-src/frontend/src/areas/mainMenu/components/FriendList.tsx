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
    Avatar,
    Drawer,
    Box,
    Divider,
    Tooltip
} from '@mui/material';
import { 
    Delete,
    Face,
    Menu,
    Close,
    SportsEsports,
    GroupAdd
} from '@mui/icons-material';

interface IFriend {
    Name: string;
}

//FriendList Component
export const FriendList = () => {

    //Maximale Anzahl an Freunden
    const MAX_flist = 10;

    //Ändert DialogTitel und DialogContent
    const [DiTi, setDiTi] = useState(false);
    const [DiCo, setDiCo] = useState(false);

    //Für das öffnen/schließen des Dialoges & des Drawer-Menu
    const [openDialog, setDialog] = useState(false);
    const [openDrawer, setDrawer] = useState(false);

    //Öffnet Dialog mit zugehörigem Titel/Content
    const handleDialogOpen = (Titel: any, Content: any) => {
        setDialog(true);
        setDiTi(Titel);
        setDiCo(Content);
    };

    //Schließt Dialog
    const handleDialogClose = () => {
        setDialog(false);
    };

    //Name des neuen Freundes
    const [friend, setfriend] = useState<string>("");
    //Freundesliste
    const [flist, setflist] = useState<IFriend[]>([]);

    //setzt friend auf Textfield input
    const handleChange = (event: any): void => {
        setfriend(event.target.value);
    }

    //Fügt Freund zur Liste hinzu und prüft dabei die Eingabe
    const AddFriend = (event: any): void => {
        event.preventDefault();
        if(friend.length !== 0) {
            if(flist.length === MAX_flist){
                const Titel = "Fehlerhafte Eingabe";
                const Content = "Deine Freundesliste ist voll!";
                handleDialogOpen(Titel,Content);
            }
            else{
                for (let i = 0; i < flist.length; i++) {
                    if (flist[i].Name === friend) {
                        const Titel = "Fehlerhafte Eingabe";
                        const Content = "Ihr seid schon befreundet!";
                        handleDialogOpen(Titel,Content);
                        return
                    }
                }
                const newFriend = {Name: friend};
                setflist([...flist,newFriend]);
            }
        } else {
            const Titel = "Fehlerhafte Eingabe";
            const Content = "Es wurde nichts eingegeben!";
            handleDialogOpen(Titel,Content);
        }
    }

    //Toggle für Side-Menu
    const toggleDrawer = (openDrawer: any) => (event: any) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        setDrawer(openDrawer);
    }

    return (
        <>
        <Tooltip title="Freundesliste" placement='right'>
            <IconButton
                aria-label='open Drawer'
                data-testid='Open-Drawer-Button'
                onClick={toggleDrawer(true)}>
                <Menu/>
            </IconButton>
        </Tooltip>

        <Drawer
            anchor='left'
            variant='temporary'
            open={openDrawer}
            onClose={toggleDrawer(false)}
        >
            <Box>
                <Tooltip title="Schließen" placement='bottom'>
                    <IconButton 
                        sx={{margin: 1, float: 'right'}}
                        onClick={toggleDrawer(false)}
                    >
                        <Close/>
                    </IconButton>
                </Tooltip>

                <Grid
                    container
                    spacing={1}
                    direction={'row'}
                    alignItems={'center'}
                    style={{
                        margin: 1
                    }}
                >
                    <Grid item>
                        <Typography 
                            variant="h6"
                            sx={{marginLeft: 3}}
                        >
                            Du hast {flist.length}/10 Freunde!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            inputProps={{ "data-testid": "Input-Friend-Name" }}
                            placeholder='Name'
                            value={friend}
                            onChange={handleChange}
                            sx={{marginLeft: 3}}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip title="Freund hinzufügen" placement='bottom'>
                            <IconButton
                                data-testid='Add-Friend-Button'
                                onClick={AddFriend}
                                sx={{marginLeft: 3}}
                                >
                                <GroupAdd/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Divider sx={{margin: 5}}/>

                <Grid>
                    <List sx={{ width: '100%', maxWidth: 600, background: '#bbd8b1', margin: 2}}>
                        {flist.map((value) => (
                            <ListItem
                                key={value.Name}
                                disableGutters
                                sx={{padding: 2}}
                                secondaryAction={
                                    <>
                                    <Tooltip title="Zum Spiel einladen" placement='bottom'>
                                        <IconButton
                                            aria-label="invite"
                                        >
                                            <Avatar style={{ backgroundColor: 'white'}}>
                                                <SportsEsports color="primary" style={{ backgroundColor: 'white'}}></SportsEsports>
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Freund entfernen" placement='bottom'>
                                        <IconButton 
                                            aria-label="delete"
                                            onClick={() => {
                                                //Öffnet Info-Dialog
                                                const Titel ="Freund entfernt";
                                                const Content ="Dein Freund wurde erfolgreich entfernt!";
                                                handleDialogOpen(Titel, Content);
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
                                    </Tooltip>
                                    </>
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
            </Box>
        </Drawer>

        <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {DiTi}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {DiCo}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} autoFocus>
                    {"Ok"}
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}