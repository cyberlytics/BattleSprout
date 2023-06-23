import { useState,useEffect } from 'react';
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
    GroupAdd,
    Token
} from '@mui/icons-material';
import axios from 'axios';

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

        const loadFriends = async () =>{
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:3000/api/friends",{
                    headers: {
                        authorization:token,
                    },
                });
                for(var i = 0;i< response.data.length;i++){   
                    //create a IFriend object to be added to the friendlist
                    const newFriend: IFriend ={
                        Name: response.data[i].name,
                    }
                    //check if the Friend already exists before adding them
                    const friendExist = flist.some((newFriend)=> newFriend.Name === response.data[i].name);

                    //if the Friend doesn't exist append them to the existing friendlist
                    if(!friendExist){
                    setflist((prevFlist) =>[...prevFlist,newFriend]);
                    }
                
            }
                            
            }catch(error){
                console.error(error);
            }
        }
        const deleteFriend = async (friendName :string)=>{
            const token = localStorage.getItem('token');

            try{
            const response = await axios.delete("http://localhost:3000/api/friends",{
                headers: {
                    authorization:token,
                },
                data:{
                    name: friendName,
                },
            });

                
            }catch(error){
                console.error(error);
            }
        }


    //Fügt Freund zur Liste hinzu und prüft dabei die Eingabe
    const AddFriend = async (event: any): Promise<void> => {
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
                try{
                    const token = localStorage.getItem('token');
                    const response = await axios.post("http://localhost:3000/api/friends",{name: friend},{headers: {authorization: token, }});
                    const newFriend = {Name: friend};
                    setflist([...flist,newFriend]);
                    setfriend('');
                }catch(error){
                    console.error('Could not add friend: ', error);
                }
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
        loadFriends();
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
                                                    }))
                                                    deleteFriend(FriendToDelete);
                                                }
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