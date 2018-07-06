const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	facebookID: {
		type: String,
		required: false
	},
	googleID: {
		type: String,
		required: false
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
		required: false
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
	}
});

mongoose.model('User', userSchema);
