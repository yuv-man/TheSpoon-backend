import { Schema, model } from 'mongoose';

const betSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  predictedResult: String,
  pointsAwarded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default model('Bet', betSchema);
