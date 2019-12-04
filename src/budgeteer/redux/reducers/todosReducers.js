import { Actions } from './../actions/todosActions';

function addTodo(state, action) {

	const { id, text } = action;

	const newTodo = {
		id,
		text,
		completed: false
	};

	return [...state, newTodo];

}

function toggleTodo(state, action) {

	return state.map(todo =>{
		return todo.id === action.id ?
			{...todo, completed: !todo.completed } :
			todo
	});

}

const todos = (state = [], action) => {

	switch (action.type) {
		case Actions.ADD_TODO:
			return addTodo(state, action);
		case Actions.TOGGLE_TODO:
			return toggleTodo(state, action);
		default:
			return state
	}
}

export default todos

