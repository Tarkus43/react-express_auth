import { describe, it, expect, TestRunner } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import InputField from "./InputField";
import { createRef } from 'react'
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

describe("InputField", () => {
    it("renders with proper title", () => {
        const text = "test!"
        render(<InputField
            title={text}
            inner="test"
            type="email"
            inputClassName="test"
        />)

        expect(screen.getByText(text)).toBeInTheDocument()
    })

    it("renders with correct className", () => {
        const testClassName = "test"
        render(<InputField
            title="test"
            inner="test"
            type="email"
            inputClassName={testClassName}
        />)

        expect(screen.getByPlaceholderText("test")).toHaveClass(testClassName)
    })

    it("attaches ref to the underlying input DOM element", () => {
        const testRef = createRef<HTMLInputElement>()

        render(<InputField
            title="test"
            inner="test"
            type="email"
            inputClassName="test"
            emailInputRef={testRef}
        />)

        expect(testRef.current).not.toBeNull()
        expect(testRef.current).toBeInstanceOf(HTMLInputElement)
        expect(testRef.current.tagName).toBe("INPUT")
    })

    it("allows focusing the input via ref", () => {
        const testRef = createRef<HTMLInputElement>()

        render(<InputField
            title="test"
            inner="test"
            type="email"
            inputClassName="test"
            emailInputRef={testRef}
        />)

        expect(testRef.current).not.toHaveFocus()

        testRef.current?.focus()

        expect(testRef.current).toHaveFocus()
    })
    
    it("calls callback properly", async () => {
        const handleInput = vi.fn()

        render(<InputField
            title="test"
            inner="test"
            type="email"
            inputClassName="test"
            onChange={handleInput}
        />)

        await userEvent.type(screen.getByPlaceholderText("test"), "a")

        expect(handleInput).toHaveBeenCalledTimes(1)
    })

    it("renders with correct type", () => {
        const testType = "email"

        render(<InputField
            title="test"
            inner="test"
            type={testType}
            inputClassName="test"
        />)

        expect(screen.getByPlaceholderText("test")).toHaveAttribute("type", testType)
    })

    it("renders with correct placeholder", () => {
        const testPlaceholder = "aboba"
        
        render(<InputField
            title="test"
            inner={testPlaceholder}
            type="email"
            inputClassName="test"
        />)

        expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument()
    })
})