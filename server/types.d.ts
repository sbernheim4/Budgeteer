import { Document } from 'mongoose';

export interface ISavingsData {
	institutionId: string;
	institutionBalance: number;
	institutionBalanceObject: object;
}

export interface IHistoricalData {
	date: string;
	savingsData: ISavingsData[];
}

export interface IUser extends Document {
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
