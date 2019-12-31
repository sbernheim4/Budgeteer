export default function storeData(state, action, name) {

	const { payload } = action;

	const updatedState = {
		[name]: payload
	};

	const newState = Object.assign({}, state, updatedState);

	return newState;

}
