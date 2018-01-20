const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    monthlyBudget: Number,
    accessTokens: Array,
    itemID: Array
});

mongoose.model('User', userSchema);
