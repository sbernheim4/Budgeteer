export default function storeData(state, action, name) {

	const { payload } = action;

	const localState = {
		[name]: payload
	};

	const newState = Object.assign({}, state, localState);

	return newState;

}
