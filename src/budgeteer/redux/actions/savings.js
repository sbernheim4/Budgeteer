export const SavingsActions = {
	UPDATE_BANK_INFO: 'UPDATE_BANK_INFO'
};

export const updateBankInfo = (newBankInfo) => {

	return {
		type: SavingsActions.UPDATE_BANK_INFO,
		payload: newBankInfo
	};

};
