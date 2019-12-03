import { Document } from 'mongoose';

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

export interface IInstitutionSavingsInfo {
	institutionId: string;
	savingsData: IInstitutionSavingsPoint[];
}

export interface IInstitutionSavingsPoint {
	date: string;
	institutionalBalance: number;
}

interface IInstitutionalBalanceObject {
    [key: string]: {
        accountBalance: number;
        accountName: string;
        accountType: string;
    }
}

export interface IBankInfo {
	institutionId: string;
	institutionalBalance: number;
    institutionBalanceObject: IInstitutionalBalanceObject;
}
