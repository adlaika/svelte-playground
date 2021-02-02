<script lang="ts">
    import TodoList from "./TodoList.svelte";
    import TodoInput from "./TodoInput.svelte";

    let todos = []

    const handleRemoveTodo = event => {
        todos = todos.filter(todo => todo !== event.detail)
    }

    const handleAddTodo = event => {
        todos = [event.detail, ...todos]
    }
</script>

<div id="container">
    <TodoInput todos={todos} on:addTodo={handleAddTodo}/>
    <TodoList todos={todos} on:removeTodo={handleRemoveTodo}/>
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