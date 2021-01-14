import Comp from './Comp.svelte';

const app = new Comp({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;