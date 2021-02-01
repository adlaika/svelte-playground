import 'svelte'

import TodoComponent from './TodoComponent.svelte';

const app = new TodoComponent({
	target: document.body, //an HTML element to render to. Required.
});

export default app;