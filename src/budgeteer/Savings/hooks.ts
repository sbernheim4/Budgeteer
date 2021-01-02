import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import differenceInDays from 'date-fns/differenceInDays'
import { updateBankInfo } from './../redux/actions/savings';

import { getDisplayNames } from './../redux/actions/app';

export const useDisplayNames = () => {

	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(getDisplayNames());

	}, []);

};

export const useSavingsData = () => {

	const dispatch = useDispatch();
	const [savings, setSavings] = useState(0);

	const cacheKeyPrefix = 'budgeteer--savings';

	const cacheSavingsData = (totalSavings, bankInfo) => {

		const serializedBankInfo = JSON.stringify(bankInfo);

		window.localStorage.setItem(`${cacheKeyPrefix}--totalSavings`, totalSavings);
		window.localStorage.setItem(`${cacheKeyPrefix}--arrayOfInstitutionInfo`, serializedBankInfo);
		window.localStorage.setItem(`${cacheKeyPrefix}--entryTime`, new Date().toLocaleString());

	}

	const getSavingsDataFromServer = async () => {

		try {

			const savingsDataRequest = await axios.get('/plaid-api/balance');
			const savingsData = savingsDataRequest.data;

			if (savingsData.Error) {

				const keyAndEnv = await axios.get('/plaid-api/key-and-env');

				// @ts-ignore
				const plaid = Plaid.create({
					apiVersion: 'v2',
					clientName: 'Budgeteer',
					env: keyAndEnv.data.env,
					product: ['balance'],
					key: keyAndEnv.data.publicKey,
					token: savingsData.publicToken,
					onSuccess: function() {
						console.log('Update of Account successful');
					}
				});

				plaid.open();
			}

			const { totalSavings, arrayOfObjects } = savingsData;

			return {
				totalSavings,
				bankInfo: arrayOfObjects
			}


		} catch (error) {

			console.log(error);

        }
	}


	const getSavingsData = async () => {

		const serializedTotalSavings = window.localStorage.getItem(`${cacheKeyPrefix}--totalSavings`);
		const serializedBankInfo = window.localStorage.getItem(`${cacheKeyPrefix}--arrayOfInstitutionInfo`);

		const isLocalStorageStale = () => {

			const serializedEntryTime = window.localStorage.getItem(`${cacheKeyPrefix}--entryTime`);
			const entryTime = new Date(serializedEntryTime);
			const now = new Date();
			const timeElapsedInDays = differenceInDays(now, entryTime);
			const thresholdInDays = 1;

			return timeElapsedInDays > thresholdInDays;

		}


		if (!isLocalStorageStale() && serializedBankInfo !== 'undefined' && serializedTotalSavings !== 'undefined') {

			const totalSavings = new Number(serializedTotalSavings);
			const bankInfo = JSON.parse(serializedBankInfo);

			return {
				savings: totalSavings,
				accountBalances: bankInfo
			}

		} else {

			const savingsData = await getSavingsDataFromServer();
			const { totalSavings, bankInfo } = savingsData;

			cacheSavingsData(totalSavings, bankInfo);

			return {
				savings: totalSavings,
				accountBalances: bankInfo
			};

		}
	}

	useEffect(() => {

		getSavingsData().then(savingsData => {
			const { savings, accountBalances } = savingsData;

			setSavings(savings);

			dispatch(updateBankInfo(accountBalances));

		});

	}, []);

	return savings;

};

export const useInstitutionIds = () => {
	const [institutionNames, setInstitutionNames] = useState([]);

	const getInstitutionIds = async () => {

		try {

			const linkedBanksRequest = await axios.get('/plaid-api/linked-accounts');
			const linkedBanks = linkedBanksRequest.data.banks;

			return linkedBanks;

		} catch (error) {

			return [];

		}

	}

	useEffect(() => {

		getInstitutionIds().then(linkedBanks => {

			setInstitutionNames(linkedBanks);

		});

	}, []);

	return institutionNames;

}
