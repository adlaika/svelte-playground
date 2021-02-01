<script lang="ts">
    import TodoList from "./TodoList.svelte";
    import TodoInput from "./TodoInput.svelte";
</script>

<div id="container">
    <TodoInput/>
    <TodoList/>
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