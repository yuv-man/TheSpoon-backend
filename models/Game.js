const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  teamA: String,
  teamB: String,
  result: String,
  tournamentStage: String,
  isFinished: { type: Boolean, default: false },
  startTime: Date,
  pointsAwarded: { type: Boolean, default: false },
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;