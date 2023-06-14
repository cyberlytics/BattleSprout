import { Typography } from '@mui/material';
import React, { useState } from 'react';
import Grid from './GridComponent';

export enum CellState {
    EMPTY,
    SHIP,
    HIT,
    MISS,
}

export type CellProps = {
    index: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    cellState: CellState;
};

export const GameField: React.FC = () => {
    return (
        <>
            <div>
                <Typography
                    variant='h2'
                    style={{
                        color: '#45ad45',
                        margin: 30,
                    }}
                >
                    Spielfeld
                </Typography>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80vh',
                    }}
                >
                    <div style={{ display: 'flex', gap: '128px' }}>
                        <div>
                            <Typography variant='h4'>Dein Beet</Typography>
                            <Grid />
                        </div>

                        <div>
                            <Typography variant='h4'>
                                Beet von Unknown_User
                            </Typography>
                            <Grid />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
