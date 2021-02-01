<script lang="ts">
    import { todos } from "./stores.ts"
    import { get } from 'svelte/store'

    let inputValue = ""
    let error = ""

    function addTodo() {
        if (inputValue.length > 0) {
            error = ""
            if (get(todos).includes(inputValue)) {
                error = "Todo already exists!"
            } else {
                error = ""
                todos.update(ts => [...ts, inputValue])
                inputValue = ""
            }
        } else {
            error = "Todo must not be empty!"
        }
    }

    function handleSubmitButtonClick() {
        addTodo()
    }

    function handleKeypress(event) {
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