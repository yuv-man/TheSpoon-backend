const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    points: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
