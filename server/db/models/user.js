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
	name: {
		type: String,
		required: true
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
	},
	displayNames: {
		type: String,
		required: false
	},
	lastAccessed: {
		type: String,
		required: false
	}
});

// This registers the model into mongoose so that anywhere else in your server you can do
/*
`const User = mongoose.model('User');`
`User.update(...)`
*/
mongoose.model('User', userSchema);
