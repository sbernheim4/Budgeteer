import { Document } from 'mongoose';

export interface IInstitutionSavingsInfo {
	institutionId: string;
	savingsData: IInstitutionSavingsPoint[];
}

export interface IInstitutionSavingsPoint {
	date: string;
	institutionalBalance: number;
	institutionalBalanceMap: Map<string, number>;
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
	savings?: IInstitutionSavingsInfo[];
}

export interface IBankInfo {
	institutionId: string;
	institutionBalance: number;
	institutionBalanceObject: object;
}
