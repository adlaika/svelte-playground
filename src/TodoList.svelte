<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let todos = [];

    const removeTodo = (todo: string) => {
        dispatch("removeTodo", todo);
    }

    const handleTodoItemClick = todo => {
        removeTodo(todo)
    }
</script>

{#if todos.length === 0}
    <p id="empty-message">Add a todo to get started!</p>
{/if}

<ul id=todo-list>
    {#each todos as todo}
        <li on:click={handleTodoItemClick(todo)}>{todo}</li>
    {/each}
</ul>

<style>
    ul {
        padding: 0;
    }
</style>