import React, { FC } from 'react';
import './PlantsAvailableListComponent.css';
import { Divider, List, ListItem, ListItemText, Paper } from '@mui/material';

interface PlantsAvailableListComponentProps {
    numbers: number[];
}

export const PlantsAvailableListComponent: FC<
    PlantsAvailableListComponentProps
> = ({ numbers }) => {
    return (
        <>
            <h1 className='plants-heading'>{'Verfügbare Pfanzen:'}</h1>
            <List>
                {numbers.map((number, index) => (
                    <div key={index}>
                        <ListItem>
                            <ListItemText
                                primary={number + ' Felder Pflanze'}
                            />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </>
    );
};
