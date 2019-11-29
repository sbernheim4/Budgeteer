import { Document } from 'mongoose';

export default interface IUser extends Document {
	name?: string;
	facebookID?: string;
	googleID?: string;
	email?: string;
	monthlyBudget?: number;
	accessTokens?: Array<string>;
	itemId?: Array<string>;
	displayNames?: Array<string>;
	lastAccessed?: string;
	savings?: IHistoricalData[];
}

interface IHistoricalData {
	date: string;
	savingsData: ISavingsData[];
}

interface ISavingsData {
	institutionId: string;
	institutionBalance: number;
	institutionBalanceObject: object;
}

