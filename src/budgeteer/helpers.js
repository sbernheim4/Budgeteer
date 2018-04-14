const helper = {

	numberWithCommas(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	formatAmount(amt) {
		return (Math.round(amt * 100) / 100).toFixed(2);
	},

	toTitleCase(str) {
		if (str === "" || str === null) return "";
		return str.toLowerCase().split(' ').map(function(word) {
			return word.replace(word[0], word[0].toUpperCase());
		}).join(' ');
	}
}

export default helper
