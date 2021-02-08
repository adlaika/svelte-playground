<script lang="ts">
    import {get} from 'svelte/store'
    import type {Todos} from "./stores";

    export let todos: Todos

    let inputValue = ""
    let error = ""

    const addTodo = () => {
        error = ""
        if (inputValue.length > 0) {
            if (get(todos).includes(inputValue)) {
                error = "Todo already exists!"
            } else {
                todos.addTodo(inputValue)
                inputValue = ""
            }
        } else {
            error = "Todo must not be empty!"
        }
    }

    const handleKeypress = event => (event.code === 'Enter') ? addTodo() : null
</script>

<div id="todo-add-bar">
    <button on:click="{addTodo}">Add Todo</button>
    <input id=todo-input bind:value={inputValue} placeholder="enter todo here!" on:keypress={handleKeypress}>
</div>

{#if error}
    <p id="todo-input-error">{error}</p>
{/if}

<style>
</style>