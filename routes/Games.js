app.post('/games/:id/finish', async (req, res) => {
    const game = await __findById(req.params.id);
    if (!game) return res.status(404).send('Game not found');
  
    game.result = req.body.result;
    game.isFinished = true;
    await game.save();
  
    const bets = await _find({ game: game._id });
    for (let bet of bets) {
      if (!bet.pointsAwarded && bet.predictedResult === game.result) {
        const user = await findById(bet.user);
        user.points += 1; // Adjust the points as per your scoring rules
        await user.save();
  
        bet.pointsAwarded = true;
        await bet.save();
      }
    }
  
    res.send(game);
  });