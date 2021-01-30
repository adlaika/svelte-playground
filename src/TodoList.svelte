<script lang="ts">
    let todos = []
    let newTodo = ""
    let emptyTodoError = false
    let duplicateTodoError = false

    function addTodo() {
        if (newTodo.length > 0) {
            emptyTodoError = false
            if (todos.includes(newTodo)) {
                duplicateTodoError = true
            } else {
                duplicateTodoError = false
                todos = [...todos, newTodo]
                newTodo = ""
            }
        } else {
            emptyTodoError = true
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

<button on:click="{handleSubmitButtonClick}">Add Todo</button>
<input id=todo-input bind:value={newTodo} placeholder="enter todo here!" on:keypress={handleKeypress}>

{#if emptyTodoError}
    <p id="empty-todo-error">Todo must not be empty!</p>
{/if}

{#if duplicateTodoError}
    <p id="duplicate-todo-error">Todo already exists!</p>
{/if}

{#if todos.length === 0}
    <p id="empty-message">Add a todo to get started!</p>
{/if}

<ul id=todo-list>
    {#each todos as todo}
        <li on:click={handleTodoItemClick(todo)}>{todo}</li>
    {/each}
</ul>

