import 'Svelte'

import TodoApp from './TodoApp.svelte';

const app = new TodoApp({
	target: document.body, //an HTML element to render to. Required.
});

export default app;