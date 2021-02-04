import {render} from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import TodoList from '../src/TodoList.svelte'
import { createTodos } from "../src/stores"
import {addTodo} from "./util";

const noTodosYetText = "Add a todo to get started!"

test('renders an empty todo list when there are no todos', () => {
    const todos = createTodos()
    const {getByText} = render(TodoList, { props: { todos: todos }})
    expect(getByText(noTodosYetText)).toBeInTheDocument()
})

test("empty message appears if no todos have been added", async () => {
    const todos = createTodos()
    const emptyTodoListRender = render(TodoList, { props: { todos: todos }})
    const emptyMessage = emptyTodoListRender.getByText(noTodosYetText)

    expect(emptyMessage).toHaveTextContent(noTodosYetText)
})

test("empty message does not appear if todos are present", async () => {
    const todos = createTodos()
    const content = "mop the gutters"
    await todos.addTodo(content)
    const todoListWithItemsRender = render(TodoList, { props: { todos: todos }})

    const actual = todoListWithItemsRender.queryByText(noTodosYetText)
    expect(actual).toBeNull()
})

test("clicking a todo removes it from the list", async () => {
    const todos = createTodos()
    const testTodoToRemove = "vacuum the ceiling"
    const testTodos = ["brush the carpet", testTodoToRemove, "paint the lightbulbs"]
    await Promise.all(testTodos.map(t => todos.addTodo(t)))

    const rendered = render(TodoList, { props: {todos: todos}})

    const list = document.querySelector('#todo-list')
    expect(list.children.length).toEqual(3)

    const todoToDelete = rendered.getByText(testTodoToRemove)
    await userEvent.click(todoToDelete)

    expect(list.children.length).toEqual(2)
    expect(() => rendered.getByText(testTodoToRemove)).toThrow()
})
