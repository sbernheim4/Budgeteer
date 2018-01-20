const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    accessTokens: Array,
    itemID: Array
});

mongoose.model('User', userSchema);
