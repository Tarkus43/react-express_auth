import { render, screen } from "@testing-library/react";
import ErrorHandler from "./ErrorHandler";
import { describe, it, expect } from "vitest";

describe("ErrorHandler", () => {
    it("renders error based on prop", () => {
        const testText = "wrong email or password"
        render(<ErrorHandler text={testText}/>)
        expect(screen.getByText(testText)).toBeInTheDocument()
    })

    it("applies correct className", () => {
        const testClass = "test"
        render(<ErrorHandler className={testClass} text="any text"/>)

        const errorDiv = screen.getByText("any text")

        expect(errorDiv).toHaveClass(testClass)
    })
})