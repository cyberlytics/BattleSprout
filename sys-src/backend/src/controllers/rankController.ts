import { Request, Response } from 'express';
import { Rank, IRank } from '../models/rank';
import { connect, find } from '../db';

// Get all Ranks
export const getRanklist = async (req: Request, res: Response): Promise<void> => {
    await connect();

    try {
        const ranklist = await find('db', 'ranks', {});

        res.status(200).json(ranklist);
    } catch (error) {
        console.error('Fehler beim Abrufen der Rangliste: ', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Rangliste' });
    }
};

// Add a Rank
export const addRank = async (req: Request, res: Response): Promise<void> => {
    await connect();

    const { name, points } = req.body;

    const rank: IRank = new Rank({
        Name: name,
        Points: points
    });

    try {
        await rank.save();

        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Rangs: ', error);
        res.status(500).json({ error: 'Fehler beim Hinzufügen des Rangs' });
    }
};






