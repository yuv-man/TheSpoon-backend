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

router.get('/bets/:userId/bets', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all bets for the specific user
    const bets = await BetModel.find({ user: userId });

    if (!bets.length) {
      return res.status(404).send('No bets found for this user');
    }

    res.send(bets);
  } catch (error) {
    console.error('Failed to retrieve bets:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/bets/:betId', async (req, res) => {
  try {
    const betId = req.params.betId;

    // Find the bet by its ID
    const bet = await BetModel.findById(betId);

    if (!bet) {
      return res.status(404).send('Bet not found');
    }

    res.send(bet);
  } catch (error) {
    console.error('Failed to retrieve bet:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
  