const historicalSavings = [
    {
        "institutionId": "ins_3",
        "savingsData": [
            {
                date: new Date() - 1,
                institutionBalance: 21992.55,
                institutionBalanceObject: {
                    "YVynJgaLvduKJonmYjyASLeakmJRBMUQMVxwQ": {
                        "accountType": "depository",
                        "accountBalance": 15109.27,
                        "accountName": "PREMIER PLUS CKG"
                    },
                    "QV6XAgKaPeuLEQz3yX9EH39MoaKm1PFE6edeM": {
                        "accountType": "credit",
                        "accountBalance": 0,
                        "accountName": "CREDIT CARD"
                    },
                    "meV0qvQZoxi6MQBA7LVoI81jRvogkVCM1OD38": {
                        "accountType": "depository",
                        "accountBalance": 6883.28,
                        "accountName": "CHASE PLUS SAVINGS"
                    }
                }
            },
            {
                date: new Date() - 2,
                institutionBalance: 24000,
                institutionBalanceObject: {
                    "YVynJgaLvduKJonmYjyASLeakmJRBMUQMVxwQ": {
                        "accountType": "depository",
                        "accountBalance": 15109.27,
                        "accountName": "PREMIER PLUS CKG"
                    },
                    "QV6XAgKaPeuLEQz3yX9EH39MoaKm1PFE6edeM": {
                        "accountType": "credit",
                        "accountBalance": 0,
                        "accountName": "CREDIT CARD"
                    },
                    "meV0qvQZoxi6MQBA7LVoI81jRvogkVCM1OD38": {
                        "accountType": "depository",
                        "accountBalance": 6883.28,
                        "accountName": "CHASE PLUS SAVINGS"
                    }
                }
            }
        ]
    },
    {
        "institutionId": "ins_12",
        "savingsData": [
            {
                date: new Date() - 1,
                "institutionBalance": 100,
                "institutionBalanceObject": {
                    "MmADEXdqNnfNo59mkYOgCKpk3AD0jKUMK1Z5L": {
                        "accountType": "depository",
                        "accountBalance": 100,
                        "accountName": "Discover it chrome Card"
                    }
                }
            },
            {
                date: new Date() - 2,
                "institutionBalance": 200,
                "institutionBalanceObject": {
                    "MmADEXdqNnfNo59mkYOgCKpk3AD0jKUMK1Z5L": {
                        "accountType": "depository",
                        "accountBalance": 200,
                        "accountName": "Discover it chrome Card"
                    }
                }
            }
        ]
    }
]

const newDataPoint = [
    {
        "institutionId": "ins_3",
        "savingsData": [
            {
                date: new Date(),
                institutionBalance: 37000,
                institutionBalanceObject: {
                    "YVynJgaLvduKJonmYjyASLeakmJRBMUQMVxwQ": {
                        "accountType": "depository",
                        "accountBalance": 30000,
                        "accountName": "PREMIER PLUS CKG"
                    },
                    "QV6XAgKaPeuLEQz3yX9EH39MoaKm1PFE6edeM": {
                        "accountType": "credit",
                        "accountBalance": 0,
                        "accountName": "CREDIT CARD"
                    },
                    "meV0qvQZoxi6MQBA7LVoI81jRvogkVCM1OD38": {
                        "accountType": "depository",
                        "accountBalance": 7000,
                        "accountName": "CHASE PLUS SAVINGS"
                    }
                }
            }
        ]
    },
    {
        "institutionId": "ins_12",
        "savingsData": [
            {
                date: new Date(),
                "institutionBalance": 300,
                "institutionBalanceObject": {
                    "MmADEXdqNnfNo59mkYOgCKpk3AD0jKUMK1Z5L": {
                        "accountType": "depository",
                        "accountBalance": 300,
                        "accountName": "Discover it chrome Card"
                    }
                }
            }
        ]
    }
]

const linkedInstitutions = {
    length: 2
};

for (let i = 0; i < linkedInstitutions.length; i++) {
    const newDataForCurrInstitution = newDataPoint[i];
    const historicalDataForCurrInstitution = historicalSavings[i];
    historicalDataForCurrInstitution.savingsData.unshift(newDataForCurrInstitution);
}

console.log(historicalSavings[0].savingsData[0])

