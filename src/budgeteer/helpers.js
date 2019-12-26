export function numberWithCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatAmount(amt) {
	return (Math.round(amt * 100) / 100).toFixed(2);
}

export function dollarify(number) {
	return numberWithCommas(formatAmount(number));
}

export function toTitleCase(string) {
	if (string === "" || string === null) return "";
	const normalizedString = string.trim();
	return normalizedString.toLowerCase().split(' ').map(word => {
		return word.replace(word[0], word[0].toUpperCase());
	}).join(' ');
}

export function isNumber(n) {
	return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

export function mapToJson(map) {
	return JSON.stringify([...map]);
}

export function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}

export function formatDate(date) {
	const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
	const stringDate = JSON.stringify(date);

	let monthIndex = parseInt(stringDate.slice(stringDate.indexOf("-") + 1, stringDate.indexOf("-") + 3));
	const month = months[monthIndex - 1];

	const day = stringDate.slice(stringDate.length - 3, stringDate.length - 1);

	let year = stringDate.slice(1, 5);
	year = year.slice(2);

	return `${month}. ${day} '${year}`
}

export function convertTransactionDate(transactionDate) {
	const year = transactionDate.slice(0, 4);
	const month = transactionDate.slice(5, 7) - 1;
	const day = transactionDate.slice(8, 10);
	const dateObj = new Date(year, month, day);

	return dateObj;
}
