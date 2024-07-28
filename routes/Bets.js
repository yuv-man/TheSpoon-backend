const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BetModel = require("../models/Bet");

router.post('/bets', async (req, res) => {
    const bet = new BetModel(req.body);
    await bet.save();
    res.status(201).send(bet);
  });
  
  // Update Bet
router.put('/bets/:id', async (req, res) => {
    const bet = await BetModel.findById(req.params.id);
    if (!bet) return res.status(404).send('Bet not found');
  
    const game = await BetModel.findById(bet.game);
    if (game.startTime <= new Date()) {
      return res.status(400).send('Cannot update bet after the game has started');
    }
  
    bet.predictedResult = req.body.predictedResult;
    await bet.save();
    res.send(bet);
});

module.exports = router;
  