import userEvent from "@testing-library/user-event";
import {fireEvent} from "@testing-library/svelte";

export const selectInput = node => {
    const inputByRole = <HTMLInputElement>node.getByRole("textbox")
    const inputByPlaceholderText = <HTMLInputElement>node.getByPlaceholderText(/enter todo here!/i)
    expect(inputByRole).toBe(inputByPlaceholderText)
    return inputByRole
}

export const selectButton = node => {
    const buttonByRole = node.getByRole("button")
    const buttonByText = <HTMLInputElement>node.getByText(/add todo/i)
    expect(buttonByRole).toBe(buttonByText)
    return buttonByRole
}

export const addTodo = async (content, node, method: 'click'|'enter' = 'click') => {
    const input = selectInput(node)
    userEvent.type(input, content)
    expect(input.value).toEqual(content)

    if (method === 'click') {
        const button = selectButton(node)
        userEvent.click(button)
    } else {
        input.focus()
        await fireEvent.keyPress(input, { code: 'Enter' })
    }
}

