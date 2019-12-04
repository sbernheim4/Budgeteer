## Notes

Going to `dispatch` an action via

```js
const newTodo = 'Buy milk';

const opts = addTodo(newTodo);
dispatch(opts);
```

this then goes and calls the `addTodo` reducer which runs the following function

```js
function addTodo(state, action) {

	const { id, text } = action;

	const newTodo = {
		id,
		text,
		completed: false
	};

	return [...state, newTodo];

}
```
