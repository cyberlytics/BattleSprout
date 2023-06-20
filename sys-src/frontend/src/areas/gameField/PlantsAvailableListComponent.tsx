import React, { FC } from 'react';
import { Typography } from '@mui/material';
import './PlantsAvailableListComponent.css';
import { Divider, List, ListItem, ListItemText, Paper } from '@mui/material';

interface PlantsAvailableListComponentProps {
    numbers: number[];
}

export const PlantsAvailableListComponent: FC<
    PlantsAvailableListComponentProps
> = ({ numbers }) => {
    return (
        <div className="plants-container">
            <Typography variant="h5" className="plants-heading">Verfügbare Pflanzen</Typography>
            <ul className="plants-list">
                {numbers.map((number, index) => (
                    <li key={index} className="plants-item">
                        <Typography variant="body2">{number} Felder Pflanze verfügbar</Typography>
                    </li>
                ))}
            </ul>
        </div>
    );
};
