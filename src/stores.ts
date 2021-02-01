import {Writable, writable} from 'svelte/store';

export const todos: Writable<string[]> = writable([]);