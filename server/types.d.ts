import { Document } from 'mongoose';

export type User = {
	name?: string;
	facebookID?: string;
	googleID?: string;
	email?: string;
	monthlyBudget?: number;
	accessTokens?: Array<string>;
	itemId?: Array<string>;
	displayNames?: Array<string>;
	lastAccessed?: string;
	savings?: InstitutionSavingsInfo[];
} & Document;

export type InstitutionSavingsInfo = {
	institutionId: string;
	savingsData: InstitutionSavingsPoint[];
}

export type InstitutionSavingsPoint = {
	date: string;
	institutionalBalance: number;
}

type InstitutionalBalance = {
		accountBalance: number;
		accountName: string;
		accountType: string;
};

export type InstitutionalBalanceObject = Record<string, InstitutionalBalance>;

export type BankInfo = {
	institutionId: string;
	institutionBalance: number;
	institutionBalanceObject: InstitutionalBalanceObject;
}
