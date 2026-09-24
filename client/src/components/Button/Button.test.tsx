import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Button from "./Button";

describe("Button", () => {
    it("renders correct text", () => {
        const testText = "click me!"
        render(<Button 
            text={testText}
            className="test"
            type="button"
        />)

        
        expect(screen.getByText(testText)).toBeInTheDocument()
    })

    it("renders with correct className", () => {
        const testClass = "test"
        render(<Button 
            text="test"
            className={testClass}
            type="button"
        />)
        expect(screen.getByText("test")).toHaveClass(testClass)
    })

    it ("renders with correct type", () => {
        const testType = "button"
        render(<Button
            text="test"
            className="test"
            type={testType}
        />)
        expect(screen.getByText("test")).toHaveAttribute("type", testType)
    })

    it("calls callback function properly", async () => {
        const handleClick = vi.fn()
        render(<Button 
            text="test"
            className="test"
            type="button"
            onClick={handleClick}
        />)

        await userEvent.click(screen.getByText("test"))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})