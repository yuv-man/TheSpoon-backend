
const express = require("express");
const router = express.Router();
const GameModel = require("../models/Game");
const BetModel = require("../models/Bet");
const UserModel = require("../models/User");
const {pointsCalculation} = require("../utils/gamesUtils");

router.post('/games/:id/finish', async (req, res) => {
    const game = await GameModel.findById(req.params.id);
    if (!game) return res.status(404).send('Game not found');
  
    game.result = req.body.result;
    game.isFinished = true;
    game.pointsAwarded = true;
    await game.save();
  
    const bets = await BetModel.find({ game: game._id });
    for (let bet of bets) {
      if (!bet.pointsAwarded) {
        const user = await UserModel.findById(bet.user);
        collectedPoints = pointsCalculation(bet.predictedResult, game.result);
        user.points += collectedPoints;
        await user.save();
  
        bet.pointsAwarded = true;
        await bet.save();
      }
    }
  
    res.send(game);
  });

  module.exports = router;