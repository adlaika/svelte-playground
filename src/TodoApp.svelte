<script lang="ts">
    let todos = []
    let inputValue = ""
    let error = ""

    function addTodo() {
        if (inputValue.length > 0) {
            error = ""
            if (todos.includes(inputValue)) {
                error = "Todo already exists!"
            } else {
                error = ""
                todos = [...todos, inputValue]
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

    function removeTodo(todo: string) {
        todos = todos.filter(elem => elem !== todo)
    }

    function handleTodoItemClick(todo) {
        removeTodo(todo)
    }
</script>

<div id="container">
    <div id="todo-add-bar">
        <button on:click="{handleSubmitButtonClick}">Add Todo</button>
        <input id=todo-input bind:value={inputValue} placeholder="enter todo here!" on:keypress={handleKeypress}>
    </div>

    {#if error}
        <p id="todo-error">{error}</p>
    {/if}

    {#if todos.length === 0}
        <p id="empty-message">Add a todo to get started!</p>
    {/if}

    <ul id=todo-list>
        {#each todos as todo}
            <li on:click={handleTodoItemClick(todo)}>{todo}</li>
        {/each}
    </ul>
</div>

<style>
    ul {
        padding: 0;
    }
    #container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
</style>