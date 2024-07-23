app.post('/bets', async (req, res) => {
    const bet = new Bet(req.body);
    await bet.save();
    res.status(201).send(bet);
  });
  
  // Update Bet
  app.put('/bets/:id', async (req, res) => {
    const bet = await _findById(req.params.id);
    if (!bet) return res.status(404).send('Bet not found');
  
    const game = await __findById(bet.game);
    if (game.startTime <= new Date()) {
      return res.status(400).send('Cannot update bet after the game has started');
    }
  
    bet.predictedResult = req.body.predictedResult;
    await bet.save();
    res.send(bet);
  });
  