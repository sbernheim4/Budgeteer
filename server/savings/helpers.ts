import { BankInfo, InstitutionSavingsPoint, InstitutionSavingsInfo } from './../types';

/**
 * @description Converts IBankInfo[] to an of IInstitutionSavingsInfo[]
 * @param {BankInfo} data The new data point to be converted
 * @returns {InstitutionSavingsInfo} The normalized data
 */
export function formatNewDataPoints(data: BankInfo): InstitutionSavingsInfo {

	const dateString = new Date().toString();

	const { institutionId, institutionBalance } = data;

	const newInfo: InstitutionSavingsInfo = {
		institutionId,
		savingsData: [{
			date: dateString,
			institutionalBalance: institutionBalance
		}]
	};

	return newInfo;

}

/**
 * @description Merges the existing data points with the new data points
 * @param {InstitutionSavingsInfo[]} oldDataPoints An arrray containing the existing data points
 * @param {InstitutionSavingsInfo[]} newDataPoints An array of new data points to be merged
 * @returns {InstitutionSavingsInfo[]} The merged array of newDataPoints and savings
 */
export function createNewInstitutionData(oldDataPoints: InstitutionSavingsInfo, newDataPoints: InstitutionSavingsInfo): InstitutionSavingsInfo {

	const { institutionId, savingsData } = newDataPoints;

	let newDataPointsArray: InstitutionSavingsPoint[] = [];

	try {

		const oldInstitutionSavingsData = oldDataPoints.savingsData;

		oldInstitutionSavingsData.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});

		newDataPointsArray = [...oldInstitutionSavingsData, ...savingsData];

	} catch (error) {

		newDataPointsArray = savingsData;

	}

	const updatedInstitutionInfo: InstitutionSavingsInfo = {
		institutionId,
		savingsData: newDataPointsArray
	}


	return updatedInstitutionInfo;

}

