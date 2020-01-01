export default function storeData(state, action, name) {

	const { payload } = action;

	const updatedValue = {
		[name]: payload
	};

	const newState = Object.assign({}, state, updatedValue);

	return newState;

}
