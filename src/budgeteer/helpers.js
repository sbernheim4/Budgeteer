export function numberWithCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatAmount(amt) {
	return (Math.round(amt * 100) / 100).toFixed(2);
}

export function toTitleCase(str) {
	if (str === "" || str === null) return "";
	return str.toLowerCase().split(' ').map(function(word) {
		return word.replace(word[0], word[0].toUpperCase());
	}).join(' ');
}

export function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

