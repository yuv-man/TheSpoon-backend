import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    points: { type: Number, default: 0 },
});

export default model('User', userSchema);
