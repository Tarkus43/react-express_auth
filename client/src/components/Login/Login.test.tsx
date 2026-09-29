import { describe, it, expect} from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login", () => {
    it("renders itself ", () => {
        render(<Login/>)

        expect(screen.getByText("Welcome to login page!")).toBeInTheDocument()
    })
})