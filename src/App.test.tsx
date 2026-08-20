import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Smoke test to prove the Vitest + Testing Library setup works end to end.
// Will be replaced once App.tsx hosts the sidebar menu demo.
describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /get started/i })).toBeInTheDocument();
  });
});
