import express from 'express';
import createNewGame from '../controllers/gameController';

const router = express.Router();

router.post('/newgame',createNewGame);

export default router;