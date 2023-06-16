import React, { FC } from 'react';
import './PlantsAvailableListComponent.css';

interface PlantsAvailableListComponentProps {
    numbers: number[];
}

const PlantsAvailableListComponent: FC<PlantsAvailableListComponentProps> = ({ numbers }) => {
    return (
        <div className="plants-container">
            <h1 className="plants-heading">Pflanzen verfügbar</h1>
            <ul className="plants-list">
                {numbers.map((number, index) => (
                    <li key={index} className="plants-item">
                        {number} Felder Pflanze verfügbar
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlantsAvailableListComponent;