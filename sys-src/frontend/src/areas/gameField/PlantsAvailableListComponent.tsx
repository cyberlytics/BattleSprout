import React, { FC } from 'react';
import { Typography } from '@mui/material';
import './PlantsAvailableListComponent.css';
import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

interface PlantsAvailableListComponentProps {
    numbers: number[];
}

export const PlantsAvailableListComponent: FC<
    PlantsAvailableListComponentProps
> = ({ numbers }) => {
    return (
        <>
            <Typography variant="h5" className="plants-heading">Verfügbare Pflanzen</Typography>
            <List>
                { numbers.map((number, index) => (
                    <div key={ index }>
                        <ListItem>
                            <ListItemText
                                primary={ number + ' Felder Pflanze' }
                            />
                        </ListItem>
                        <Divider/>
                    </div>
                )) }
            </List>
        </>
    );
};
