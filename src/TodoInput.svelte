<script lang="ts">
    import { get } from 'svelte/store'
    import type {Todos} from "./stores";

    export let todos: Todos

    let inputValue = ""
    let error = ""

    const addTodo = () => {
        if (inputValue.length > 0) {
            error = ""
            if (get(todos).includes(inputValue)) {
                error = "Todo already exists!"
            } else {
                error = ""
                todos.addTodo(inputValue)
                inputValue = ""
            }
        } else {
            error = "Todo must not be empty!"
        }
    }

    const handleSubmitButtonClick = () => addTodo()

    const handleKeypress = event => {
        const code = event.code;
        if (code === 'Enter') {
            addTodo()
        }
    }
</script>

<div id="todo-add-bar">
    <button on:click="{handleSubmitButtonClick}">Add Todo</button>
    <input id=todo-input bind:value={inputValue} placeholder="enter todo here!" on:keypress={handleKeypress}>
</div>

{#if error}
    <p id="todo-input-error">{error}</p>
{/if}

<style>
</style>