import {Writable, writable} from 'svelte/store';

export const todosStore: Writable<string[]> = writable([]);