export const SavingsActions = {
	UPDATE_BANK_INFO: 'bankInfo'
};

export const updateBankInfo = (newBankInfo) => {

	return {
		type: SavingsActions.UPDATE_BANK_INFO,
		payload: newBankInfo
	};

};
