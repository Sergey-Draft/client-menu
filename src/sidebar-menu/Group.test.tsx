import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "./index";
import type { ComponentProps } from "react";

function renderClientsGroup(rootProps: Partial<ComponentProps<typeof Menu.Root>> = {}) {
  return render(
    <Menu.Root activeId={undefined} {...rootProps}>
      <Menu.List>
        <Menu.Group
          id="clients"
          childIds={["/clients/list", "/clients/reviews"]}
          trigger={({ triggerProps }) => <button {...triggerProps}>Clients</button>}
        >
          <Menu.Item id="/clients/list">
            {({ itemProps }) => (
              <a href="/clients/list" {...itemProps}>
                List
              </a>
            )}
          </Menu.Item>
          <Menu.Item id="/clients/reviews">
            {({ itemProps }) => (
              <a href="/clients/reviews" {...itemProps}>
                Reviews
              </a>
            )}
          </Menu.Item>
        </Menu.Group>
      </Menu.List>
    </Menu.Root>,
  );
}

describe("Menu.Group", () => {
  it("toggles the submenu open and closed on click in wide mode", async () => {
    renderClientsGroup({ collapsed: false });
    expect(screen.queryByRole("link", { name: "List" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Clients" }));
    expect(screen.getByRole("link", { name: "List" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Clients" }));
    expect(screen.queryByRole("link", { name: "List" })).not.toBeInTheDocument();
  });

  it("stays open and marks the trigger active when a nested item is active", () => {
    renderClientsGroup({ collapsed: false, activeId: "/clients/list" });

    expect(screen.getByRole("link", { name: "List" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clients" })).toHaveAttribute("data-active", "true");
  });

  it("opens on hover and closes on mouse leave when the rail is collapsed", () => {
    renderClientsGroup({ collapsed: true });
    const wrapper = screen.getByRole("button", { name: "Clients" }).closest("li")!;

    expect(screen.queryByRole("link", { name: "List" })).not.toBeInTheDocument();

    fireEvent.mouseEnter(wrapper);
    expect(screen.getByRole("link", { name: "List" })).toBeInTheDocument();

    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole("link", { name: "List" })).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    renderClientsGroup({ collapsed: false });

    await userEvent.click(screen.getByRole("button", { name: "Clients" }));
    expect(screen.getByRole("link", { name: "List" })).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("link", { name: "List" })).not.toBeInTheDocument();
  });
});
