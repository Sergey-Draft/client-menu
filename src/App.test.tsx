import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the sidebar and the default active page", () => {
    render(<App />);
    expect(screen.getByRole("navigation", { name: /основная навигация/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Payments" })).toBeInTheDocument();
  });
});
