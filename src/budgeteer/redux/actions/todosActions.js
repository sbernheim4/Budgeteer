let nextTodoId = 0

export const Actions = {
	ADD_TODO: 'TOGGLE_TODO',
	TOGGLE_TODO: 'ADD_TODO'
};

export const addTodo = (text) => ({
	type: Actions.ADD_TODO,
	id: nextTodoId++,
	text
});

export const toggleTodo = (id) => ({
	type: Actions.TOGGLE_TODO,
	id
});
