import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "./index";
import { mockMatchMedia } from "./test-utils";

describe("Menu.Item", () => {
  it("is marked active when its id matches Root's activeId", () => {
    render(
      <Menu.Root activeId="/payments">
        <Menu.List>
          <Menu.Item id="/payments">
            {({ isActive, itemProps }) => <button {...itemProps}>{isActive ? "active" : "inactive"}</button>}
          </Menu.Item>
        </Menu.List>
      </Menu.Root>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("active");
    expect(button).toHaveAttribute("aria-current", "page");
  });

  it("calls onSelect when clicked", async () => {
    const handleSelect = vi.fn();
    render(
      <Menu.Root activeId={undefined}>
        <Menu.List>
          <Menu.Item id="/payments" onSelect={handleSelect}>
            {({ itemProps }) => <button {...itemProps}>Payments</button>}
          </Menu.Item>
        </Menu.List>
      </Menu.Root>,
    );

    await userEvent.click(screen.getByRole("button"));
    expect(handleSelect).toHaveBeenCalledOnce();
  });

  it("closes the mobile drawer after a selection is made on mobile", async () => {
    mockMatchMedia(true);
    const handleMobileOpenChange = vi.fn();
    render(
      <Menu.Root activeId={undefined} mobileOpen onMobileOpenChange={handleMobileOpenChange}>
        <Menu.List>
          <Menu.Item id="/payments">{({ itemProps }) => <button {...itemProps}>Payments</button>}</Menu.Item>
        </Menu.List>
      </Menu.Root>,
    );

    await userEvent.click(screen.getByRole("button"));
    expect(handleMobileOpenChange).toHaveBeenCalledWith(false);
  });
});
