import {render} from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import TodoList from '../src/TodoList.svelte'
import { todosStore as todos } from "../src/stores"

beforeEach(() => {
    todos.set([])
})

const noTodosYetText = "Add a todo to get started!"
const selectNoTodosYet = node => node.getByText(/add a todo to get started/i)

test('renders an empty todo list when there are no todos', () => {
    const {getByText} = render(TodoList)
    expect(getByText(noTodosYetText)).toBeInTheDocument()
})

test("empty message appears if no todos have been added", async () => {
    const emptyTodoListRender = render(TodoList)
    const emptyMessage = selectNoTodosYet(emptyTodoListRender)

    expect(emptyMessage).toHaveTextContent(noTodosYetText)
})

test("empty message does not appear if todos are present", async () => {
    const content = "mop the gutters"
    todos.set([content])

    const todoListWithItemsRender = render(TodoList)

    expect(() => selectNoTodosYet(todoListWithItemsRender)).toThrow()
})

test("clicking a todo removes it from the list", async () => {
    const testTodoToRemove = "vacuum the ceiling"
    const testTodos = ["brush the carpet", testTodoToRemove, "paint the lightbulbs"]
    todos.set(testTodos)

    const rendered = render(TodoList)

    const list = document.querySelector('#todo-list')
    expect(list.children.length).toEqual(3)

    const todoToDelete = rendered.getByText(testTodoToRemove)
    await userEvent.click(todoToDelete)

    expect(list.children.length).toEqual(2)
    expect(() => rendered.getByText(testTodoToRemove)).toThrow()
})
