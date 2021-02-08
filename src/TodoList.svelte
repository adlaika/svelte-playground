<script lang="ts">
    import type {Todos} from "./stores";
    export let todos: Todos
</script>

{#if $todos.length === 0}
    <p id="empty-message">Add a todo to get started!</p>
{/if}

<ul id=todo-list>
    {#each $todos as todo}
        <li on:click={todos.removeTodo(todo)}>{todo}</li>
    {/each}
</ul>

<style>
    ul {
        padding: 0;
    }
</style>