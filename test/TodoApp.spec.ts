import {fireEvent, render} from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import TodoApp from '../src/TodoApp.svelte'
import {addTodo, selectButton} from "./util";

const emptyMessageText = "Add a todo to get started!"

test('renders an empty todo list when there are no todos', () => {
    const {getByText} = render(TodoApp)
    expect(getByText(emptyMessageText)).toBeInTheDocument()
})

test('shows an Add Todo button', () => {
    const {getByText} = render(TodoApp)
    expect(getByText(/Add Todo/i)).toBeInTheDocument()
})

test('shows an Add Todo text input', () => {
    const {getByRole} = render(TodoApp)
    expect(getByRole("textbox")).toBeInTheDocument()
})

test("clicking the Add Todo button adds a todo to the list containing the contents of the text input, clearing it", async () => {
    const rendered = render(TodoApp)

    const input = <HTMLInputElement>rendered.getByPlaceholderText(/enter todo here!/i)
    const content = "feed the cat to the dog"

    await addTodo(content, rendered, "click")

    const list = document.querySelector('#todo-list')

    expect(list.children.length).toEqual(1)
    const todo = list.querySelector('li')
    expect(todo).toHaveTextContent(content)

    expect(input.value).toEqual("")
})

test("todos can also be added with the Enter key", async () => {
    const rendered = render(TodoApp)

    const input = <HTMLInputElement>rendered.getByPlaceholderText(/enter todo here!/i)
    const content = "feed the cat to the dog"

    await addTodo(content, rendered, "enter")

    const list = document.querySelector('#todo-list')

    expect(list.children.length).toEqual(1)
    const todo = list.querySelector('li')
    expect(todo).toHaveTextContent(content)

    expect(input.value).toEqual("")
})

test("todo can only be added if text box is not empty", async () => {
    const rendered = render(TodoApp)

    const content = ""

    await addTodo(content, rendered)

    const list = document.querySelector('#todo-list')
    expect(list.children.length).toEqual(0)
})

test("empty message only appears if no todos have been added", async () => {
    const rendered = render(TodoApp)

    const emptyMessage = document.querySelector('#empty-message')
    expect(emptyMessage).toHaveTextContent(emptyMessageText)

    const content = "mop the gutters"
    await addTodo(content, rendered)

    const emptyMessage2 = document.querySelector('#empty-message')
    expect(emptyMessage2).toBeNull()
})

test("trying to add an empty todo gives helpful text", async () => {
    const rendered = render(TodoApp)

    const content = ""
    await addTodo(content, rendered)

    expect(rendered.getByText(/Todo must not be empty!/i)).toBeInTheDocument()
})

test("duplicate todos cannot be added, and trying to shows helpful text", async () => {
    const rendered = render(TodoApp)

    const content = "dig pungee pit for the mailman"
    await addTodo(content, rendered)
    await addTodo(content, rendered)

    const list = document.querySelector('#todo-list')

    expect(list.children.length).toEqual(1)
    const todo = list.querySelector('li')
    expect(todo).toHaveTextContent(content)

    expect(rendered.getByText(/todo already exists/i))
})

test("clicking a todo removes it from the list", async () => {
    const rendered = render(TodoApp)

    const input = <HTMLInputElement>rendered.getByPlaceholderText(/enter todo here!/i)
    const content = "feed the cat to the dog"

    await userEvent.type(input, content)
    const button = selectButton(rendered)
    await userEvent.click(button)

    const list = document.querySelector('#todo-list')
    expect(list.children.length).toEqual(1)
    const todo = list.querySelector('li')

    await userEvent.click(todo)
    expect(list.children.length).toEqual(0)
    expect(() => rendered.getByText(content)).toThrow()
})
