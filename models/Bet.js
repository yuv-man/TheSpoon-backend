const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const betSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  predictedResult: String,
  pointsAwarded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Bet = mongoose.model('Bet', betSchema);
module.exports = Bet