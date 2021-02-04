<script lang="ts">
    import TodoList from "./TodoList.svelte";
    import TodoInput from "./TodoInput.svelte";
    import {createTodos} from "./stores";

    const todos = createTodos();
</script>

<div id="container">
    <TodoInput todos={todos}/>
    <TodoList todos={todos}/>
</div>

<style>
    #container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
</style>