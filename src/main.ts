import 'Svelte'

import TodoList from './TodoApp.svelte';

const app = new TodoList({
	target: document.body, //an HTML element to render to. Required.
});

export default app;