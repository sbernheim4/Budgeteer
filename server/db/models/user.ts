import mongoose, { Schema } from 'mongoose';
import { User } from './../../types';

export const UserSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	facebookID: {
		type: String,
		required: false
	},
	googleID: {
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
	},
	displayNames: {
		type: String,
		required: false
	},
	lastAccessed: {
		type: String,
		required: false
	},
	savings: {
		type: Array,
		required: false
	}
});

export default mongoose.model<User>('User', UserSchema);
