import {render} from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import TodoComponent from '../src/TodoComponent.svelte'
import {selectButton, selectInput} from "./util";

test("renders all the constituent parts", () => {
    const rendered = render(TodoComponent)
    expect(selectInput(rendered)).toBeInTheDocument()
    expect(selectButton(rendered)).toBeInTheDocument()
    expect(document.querySelector('#todo-list')).toBeInTheDocument()
})

test("clicking the Add Todo button adds a todo to the list containing the contents of the text input, clearing it", async () => {
    const rendered = render(TodoComponent)

    const input = <HTMLInputElement>rendered.getByPlaceholderText(/enter todo here!/i)
    const content = "feed the cat to the dog"

    await userEvent.type(input, content)
    expect(input.value).toEqual(content)

    const button = rendered.getByText(/Add Todo/i)
    await userEvent.click(button)

    const list = document.querySelector('#todo-list')

    expect(list.children.length).toEqual(1)
    const todo = list.querySelector('li')
    expect(todo).toHaveTextContent(content)

    expect(input.value).toEqual("")
})

