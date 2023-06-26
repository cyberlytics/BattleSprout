import express = require('express');
import RankController = require ('../controllers/rankController');

const router = express.Router();

//get Ranklist
router.get("/api/ranks",RankController.getRanklist);

//add Ranklist
router.post("/api/ranks",RankController.addRank);


module.exports = router;