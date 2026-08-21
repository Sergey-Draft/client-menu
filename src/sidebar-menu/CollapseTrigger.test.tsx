import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "./index";

describe("Menu.CollapseTrigger", () => {
  it("toggles its own state when uncontrolled", async () => {
    render(
      <Menu.Root defaultCollapsed={false}>
        <Menu.CollapseTrigger>{({ collapsed }) => (collapsed ? "Expand" : "Collapse")}</Menu.CollapseTrigger>
      </Menu.Root>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Collapse");

    await userEvent.click(button);
    expect(button).toHaveTextContent("Expand");
  });

  it("when controlled, only reports intent via onCollapsedChange and waits for the prop to change", async () => {
    const handleChange = vi.fn();
    render(
      <Menu.Root collapsed={false} onCollapsedChange={handleChange}>
        <Menu.CollapseTrigger>{({ collapsed }) => (collapsed ? "Expand" : "Collapse")}</Menu.CollapseTrigger>
      </Menu.Root>,
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleChange).toHaveBeenCalledWith(true);
    expect(button).toHaveTextContent("Collapse");
  });
});
