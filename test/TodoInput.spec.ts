import {fireEvent, render} from '@testing-library/svelte'
import TodoInput from '../src/TodoInput.svelte'
import { todosStore as todos } from "../src/stores"
import { get } from "svelte/store"
import {addTodo, selectInput} from "./util";

beforeEach(() => {
    todos.set([])
})

test('shows an Add Todo button', () => {
    const {getByText} = render(TodoInput)
    expect(getByText(/add todo/i)).toBeInTheDocument()
})

test('shows an Add Todo text input', () => {
    const {getByRole} = render(TodoInput)
    expect(getByRole("textbox")).toBeInTheDocument()
})

test("clicking the Add Todo button adds a todo and clears the input textbox", async () => {
    const rendered = render(TodoInput)

    const input = selectInput(rendered)
    const content = "feed the cat to the dog"
    await addTodo(content, rendered, "click")

    expect(input.value).toEqual("")
    expect(get(todos)).toEqual([content])
})

test("todos can also be added with the Enter key", async () => {
    const rendered = render(TodoInput)

    const input = selectInput(rendered)
    const content = "feed the cat to the dog"

    await addTodo(content, rendered, "enter")

    expect(input.value).toEqual("")
    expect(get(todos)).toEqual([content])
})

test("trying to add an empty todo fails and gives helpful text", async () => {
    const rendered = render(TodoInput)

    await addTodo("", rendered)

    expect(get(todos)).toEqual([])
    expect(rendered.getByText(/todo must not be empty/i)).toBeInTheDocument()
})

test("duplicate todos cannot be added, and helpful text shows if user tries", async () => {
    const rendered = render(TodoInput)

    const content = "dig pungee pit for the mailman"

    await addTodo(content, rendered)
    await addTodo(content, rendered)

    expect(get(todos)).toEqual([content])
    expect(rendered.getByText(/todo already exists/i))
})

