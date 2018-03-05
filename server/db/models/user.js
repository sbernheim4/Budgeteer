const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: false
	},
	lastName: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	monthlyBudget: {
		type: Number,
		required: false
	},
	accessTokens: {
		type: Array,
		required: false
	},
	itemID: {
		type: Array,
		required: false
	},
	connectedAccounts: {
		type: Array,
		required: false
	},
});

mongoose.model('User', userSchema);
