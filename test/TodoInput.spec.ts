import {render} from '@testing-library/svelte'
import TodoInput from '../src/TodoInput.svelte'
import {addTodo, selectInput} from "./util";

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

    rendered.component.$on("addTodo", event => {
        expect(event.detail).toEqual(content)
    })

    await addTodo(content, rendered, "click")

    expect(input.value).toEqual("")
})

test("todos can also be added with the Enter key", async () => {
    const rendered = render(TodoInput)

    const input = selectInput(rendered)
    const content = "feed the cat to the dog"

    rendered.component.$on("addTodo", event => {
       expect(event.detail).toEqual(content)
    })

    await addTodo(content, rendered, "enter")

    expect(input.value).toEqual("")
})

test("trying to add an empty todo fails and gives helpful text", async () => {
    const rendered = render(TodoInput)

    rendered.component.$on("addTodo", event => {
        fail("add todo event was fired, but shouldn't have been.")
    })

    await addTodo("", rendered)

    expect(rendered.getByText(/todo must not be empty/i)).toBeInTheDocument()
})

test("duplicate todos cannot be added, and helpful text shows if user tries", async () => {
    const content = "dig pungee pit for the mailman"
    const rendered = render(TodoInput, { props: { todos: [content] }})

    rendered.component.$on("addTodo", event => {
        fail("add todo event was fired, but shouldn't have been.")
    })

    await addTodo(content, rendered)

    expect(rendered.getByText(/todo already exists/i)).toBeInTheDocument()
})

