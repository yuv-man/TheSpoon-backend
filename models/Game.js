import { Schema, model } from 'mongoose';

const gameSchema = new Schema({
  teamA: String,
  teamB: String,
  result: String,  // e.g., "2-1"
  isFinished: { type: Boolean, default: false },
  startTime: Date,
});

export default model('Game', gameSchema);