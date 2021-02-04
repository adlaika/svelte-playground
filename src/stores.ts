import {Readable, writable} from 'svelte/store';

export interface Todos extends Readable<string[]> {
    removeTodo(value: string): void;
    addTodo(value: string): void;
    reset(): void;
}

export const createTodos: () => Todos = () => {
    const { subscribe, update, set } = writable([]);

    const removeTodo = (todo: string) => {
        update(ts => ts.filter(elem => elem !== todo))
    }

    const addTodo = (todo: string) => {
        update(ts => [...ts, todo])
    }

    const reset = () => set([])

    return {
        subscribe,
        addTodo,
        removeTodo,
        reset
    };
}