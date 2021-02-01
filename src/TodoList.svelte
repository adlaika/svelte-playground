<script lang="ts">
    import { todosStore as todos } from "./stores.ts";

    function removeTodo(todo: string) {
        todos.update(ts => ts.filter(elem => elem !== todo))
    }

    function handleTodoItemClick(todo) {
        removeTodo(todo)
    }
</script>


{#if $todos.length === 0}
    <p id="empty-message">Add a todo to get started!</p>
{/if}

<ul id=todo-list>
    {#each $todos as todo}
        <li on:click={handleTodoItemClick(todo)}>{todo}</li>
    {/each}
</ul>

<style>
    ul {
        padding: 0;
    }
</style>