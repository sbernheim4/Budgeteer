import { IBankInfo, IInstitutionSavingsPoint, IInstitutionSavingsInfo } from './../types';

/**
 * @description Converts IBankInfo[] to an of IInstitutionSavingsInfo[]
 * @param {IBankInfo} data The new data point to be converted
 * @returns {IInstitutionSavingsInfo} The normalized data
 */
export function formatNewDataPoints(data: IBankInfo): IInstitutionSavingsInfo {

	const dateString = new Date().toString();

	const { institutionId, institutionBalance } = data;

	const newInfo: IInstitutionSavingsInfo = {
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
 * @param {IInstitutionSavingsInfo[]} oldDataPoints An arrray containing the existing data points
 * @param {IInstitutionSavingsInfo[]} newDataPoints An array of new data points to be merged
 * @returns {IInstitutionSavingsInfo[]} The merged array of newDataPoints and savings
 */
export function createNewInstitutionData(oldDataPoints: IInstitutionSavingsInfo, newDataPoints: IInstitutionSavingsInfo): IInstitutionSavingsInfo {

	const { institutionId, savingsData } = newDataPoints;

	let newDataPointsArray: IInstitutionSavingsPoint[] = [];

	try {

		const oldInstitutionSavingsData = oldDataPoints.savingsData;

		oldInstitutionSavingsData.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});

		newDataPointsArray = [...oldInstitutionSavingsData, ...savingsData];

	} catch (error) {

		newDataPointsArray = savingsData;

	}

	const updatedInstitutionInfo: IInstitutionSavingsInfo = {
		institutionId,
		savingsData: newDataPointsArray
	}


	return updatedInstitutionInfo;

}

