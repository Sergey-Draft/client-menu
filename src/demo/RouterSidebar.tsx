import { Link } from "react-router-dom";
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Menu } from "../sidebar-menu";
import { isNavGroup, type NavEntry } from "./navigation";

export interface RouterSidebarProps {
  entries: NavEntry[];
  activeId: string | undefined;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

const rowBase =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500";
const rowInactive = "text-gray-600";
const rowActive = "bg-blue-50 text-blue-700 hover:bg-blue-50";

export function RouterSidebar({
  entries,
  activeId,
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileOpenChange,
}: RouterSidebarProps) {
  return (
    <Menu.Root
      activeId={activeId}
      collapsed={collapsed}
      onCollapsedChange={onCollapsedChange}
      mobileOpen={mobileOpen}
      onMobileOpenChange={onMobileOpenChange}
    >
      <Menu.MobileOverlay className="fixed inset-0 z-40 bg-black/40 md:hidden" />

      <nav
        aria-label="Основная навигация"
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-all duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          collapsed ? "md:w-16" : "md:w-64",
        ].join(" ")}
      >
        <div className="flex h-14 shrink-0 items-center px-4 font-semibold text-gray-900">
          <span className={collapsed ? "md:sr-only" : ""}>HelloClient</span>
        </div>

        <Menu.List className="flex-1 space-y-1 px-2">
          {entries.map((entry) =>
            isNavGroup(entry) ? (
              <Menu.Group
                key={entry.id}
                id={entry.id}
                className="relative"
                childIds={entry.children.map((child) => child.id)}
                submenuClassName={
                  collapsed
                    ? "space-y-1 pl-8 md:absolute md:left-full md:top-0 md:ml-1 md:w-48 md:rounded-md md:border md:border-gray-200 md:bg-white md:p-1 md:pl-1 md:shadow-lg"
                    : "space-y-1 pl-8"
                }
                trigger={({ isActive, isOpen, triggerProps }) => (
                  <button
                    {...triggerProps}
                    className={[rowBase, isActive ? rowActive : rowInactive, collapsed ? "md:justify-center" : ""].join(
                      " ",
                    )}
                  >
                    <entry.icon size={20} aria-hidden="true" className="shrink-0" />
                    <span className={["flex-1 text-left", collapsed ? "md:sr-only" : ""].join(" ")}>
                      {entry.label}
                    </span>
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={["shrink-0 transition-transform", isOpen ? "rotate-180" : "", collapsed ? "md:hidden" : ""].join(
                        " ",
                      )}
                    />
                  </button>
                )}
              >
                {entry.children.map((child) => (
                  <Menu.Item key={child.id} id={child.id}>
                    {({ isActive, itemProps }) => (
                      <Link to={child.id} {...itemProps} className={[rowBase, "py-1.5", isActive ? rowActive : rowInactive].join(" ")}>
                        {child.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Group>
            ) : (
              <Menu.Item key={entry.id} id={entry.id}>
                {({ isActive, itemProps }) => (
                  <Link
                    to={entry.id}
                    {...itemProps}
                    className={[rowBase, isActive ? rowActive : rowInactive, collapsed ? "md:justify-center" : ""].join(
                      " ",
                    )}
                  >
                    <entry.icon size={20} aria-hidden="true" className="shrink-0" />
                    <span className={collapsed ? "md:sr-only" : ""}>{entry.label}</span>
                  </Link>
                )}
              </Menu.Item>
            ),
          )}
        </Menu.List>

        <Menu.CollapseTrigger className="m-2 hidden items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 md:flex">
          {({ collapsed }) => (collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />)}
        </Menu.CollapseTrigger>
      </nav>
    </Menu.Root>
  );
}
