import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorHandler from "./ErrorHandler";
import { describe, it, expect } from "vitest";

describe("ErrorHandler", () => {
    it("renders error based on prop", () => {
        render(<ErrorHandler text="ok" className="test"/>)
        expect(screen.getByText("ok"))
    })
})