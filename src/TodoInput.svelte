<script lang="ts">
    import { todosStore as todos } from "./stores.ts"
    import { get } from 'svelte/store'

    let inputValue = ""
    let emptyInputValueError = false
    let duplicateTodoError = false

    function addTodo() {
        if (inputValue.length > 0) {
            emptyInputValueError = false
            if (get(todos).includes(inputValue)) {
                duplicateTodoError = true
            } else {
                duplicateTodoError = false
                todos.update(ts => [...ts, inputValue])
                inputValue = ""
            }
        } else {
            emptyInputValueError = true
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

{#if emptyInputValueError}
    <p id="empty-todo-error">Todo must not be empty!</p>
{/if}

{#if duplicateTodoError}
    <p id="duplicate-todo-error">Todo already exists!</p>
{/if}

<style>
</style>