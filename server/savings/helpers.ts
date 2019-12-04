import { IBankInfo, IInstitutionSavingsInfo } from './../types';

/**
 * @description Converts IBankInfo[] to an of IInstitutionSavingsInfo[]
 * @param {IBankInfo[]} data The array to be converted
 * @returns {IInstitutionSavingsInfo[]} The converted arrray
 */
export function formatNewDataPoints(data: IBankInfo[]): IInstitutionSavingsInfo[] {

	const dateString = new Date().toString();

	const savingsInfo = data.map(institution => {

		const { institutionId, institutionBalance } = institution;

		const newInfo: IInstitutionSavingsInfo = {
			institutionId,
			savingsData: [{
				date: dateString,
				institutionalBalance: institutionBalance
			}]
		};

		return newInfo;

	});

	return savingsInfo;

}

/**
 * @description Merges the existing data points with the new data points
 * @param {IInstitutionSavingsInfo[]} newDataPoints An array of new data points to be merged
 * @param {IInstitutionSavingsInfo[]} oldDataPoints An arrray containing the existing data points
 * @returns {IInstitutionSavingsInfo[]} The merged array of newDataPoints and savings
 */
export function createNewInstitutionSavingsInfo(newDataPoints: IInstitutionSavingsInfo[], oldDataPoints: IInstitutionSavingsInfo[]): IInstitutionSavingsInfo[] {

	const updatedInstitutionInfo = newDataPoints.map(dataPoint => {

		const { institutionId, savingsData } = dataPoint;

		const currInstitution = oldDataPoints.find(institution => institution.institutionId === institutionId);
		let newDataPointsArray = [];

		try {

			const oldDataPoints = currInstitution.savingsData;

			oldDataPoints.sort((a, b) => {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			});

			newDataPointsArray = [...savingsData, ...oldDataPoints];

		} catch (error) {

			newDataPointsArray = [...savingsData];

		}

		const updatedInstitutionInfo: IInstitutionSavingsInfo = {
			institutionId,
			savingsData: newDataPointsArray
		}

		return updatedInstitutionInfo;

	});

	return updatedInstitutionInfo;

}
