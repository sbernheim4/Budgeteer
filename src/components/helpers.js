const helper = {

	numberWithCommas(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	formatAmount(amt) {
		return (Math.round(amt * 100) / 100).toFixed(2);
	}

}

export default helper
