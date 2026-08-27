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
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 " +
  "sm:h-full sm:min-w-16 sm:flex-col sm:justify-center sm:gap-1 sm:rounded-none sm:px-2 sm:py-1 sm:text-xs " +
  "lg:h-auto lg:min-w-0 lg:flex-row lg:gap-3 lg:rounded-md lg:px-3 lg:py-2 lg:text-sm";

const subRowBase =
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 " +
  "sm:rounded-none sm:px-4 sm:py-3 " +
  "lg:rounded-md lg:px-3 lg:py-2";

const rowInactive = "text-gray-600";
const rowActive = "bg-blue-50 text-blue-700 hover:bg-blue-50";

const labelClassName = "flex-1 text-left sm:flex-none sm:text-center lg:flex-1 lg:text-left";

const submenuShared =
  "space-y-1 pl-8 " +
  "sm:fixed sm:left-0 sm:right-0 sm:top-auto sm:bottom-16 sm:z-50 sm:max-h-80 sm:w-full sm:space-y-0 sm:divide-y sm:divide-gray-100 sm:overflow-y-auto sm:rounded-t-xl sm:border sm:border-gray-200 sm:bg-white sm:p-0 sm:pl-0 sm:shadow-lg";
const submenuLgInline =
  "lg:static lg:left-auto lg:right-auto lg:top-auto lg:bottom-auto lg:w-auto lg:max-h-none lg:space-y-1 lg:divide-y-0 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:pl-8 lg:shadow-none";
const submenuLgFlyout =
  "lg:absolute lg:left-full lg:right-auto lg:top-0 lg:bottom-auto lg:ml-1 lg:w-48 lg:max-h-80 lg:space-y-1 lg:divide-y-0 lg:overflow-y-auto lg:rounded-md lg:border lg:border-gray-200 lg:bg-white lg:p-1 lg:pl-1 lg:shadow-lg";

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
      <Menu.MobileOverlay className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 sm:hidden" />

      <nav
        aria-label="Основная навигация"
        className={[
          "fixed z-50 flex border-gray-200 bg-white transition-all duration-300 ease-in-out",
          "inset-y-0 w-64 flex-col border-r",
          // Animating `left` instead of `transform` here on purpose: a
          // transform on this element (even translate-x-0) would create a
          // new containing block, breaking every `position: fixed` child
          // used further down (the tablet sheet, its backdrop).
          mobileOpen ? "left-0" : "-left-64",
          "sm:left-0 sm:right-0 sm:top-auto sm:h-16 sm:w-full sm:flex-row sm:overflow-x-auto sm:border-t sm:border-r-0",
          "lg:top-0 lg:right-auto lg:h-auto lg:flex-col lg:overflow-x-visible lg:border-t-0 lg:border-r",
          collapsed ? "lg:w-16" : "lg:w-64",
        ].join(" ")}
      >
        <div className="flex h-14 shrink-0 items-center px-4 font-semibold text-gray-900 sm:hidden lg:flex">
          <span className={collapsed ? "lg:sr-only" : ""}>HelloClient</span>
        </div>

        <Menu.List
          className={[
            "flex-1 space-y-1 px-2",
            "sm:flex sm:items-stretch sm:gap-1 sm:space-y-0 sm:overflow-x-auto sm:px-1",
            "lg:block lg:space-y-1 lg:overflow-x-visible lg:px-2",
          ].join(" ")}
        >
          {entries.map((entry) =>
            isNavGroup(entry) ? (
              <Menu.Group
                key={entry.id}
                id={entry.id}
                className="relative"
                childIds={entry.children.map((child) => child.id)}
                submenuClassName={[submenuShared, collapsed ? submenuLgFlyout : submenuLgInline].join(" ")}
                trigger={({ isActive, isOpen, triggerProps }) => (
                  <>
                    <button
                      {...triggerProps}
                      className={[rowBase, isActive ? rowActive : rowInactive, collapsed ? "lg:justify-center" : "lg:justify-start"].join(
                        " ",
                      )}
                    >
                      <entry.icon size={20} aria-hidden="true" className="shrink-0" />
                      <span className={[labelClassName, collapsed ? "lg:sr-only" : ""].join(" ")}>{entry.label}</span>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={[
                          "shrink-0 transition-transform",
                          isOpen ? "rotate-180" : "",
                          "sm:hidden",
                          collapsed ? "lg:hidden" : "lg:block",
                        ].join(" ")}
                      />
                    </button>
                    <div
                      aria-hidden="true"
                      onClick={isOpen ? triggerProps.onClick : undefined}
                      className={[
                        "fixed inset-0 z-40 hidden bg-black/40 transition-opacity duration-300 sm:block lg:hidden",
                        isOpen ? "" : "sm:pointer-events-none sm:opacity-0",
                      ].join(" ")}
                    />
                  </>
                )}
              >
                {entry.children.map((child) => (
                  <Menu.Item key={child.id} id={child.id}>
                    {({ isActive, itemProps }) => (
                      <Link to={child.id} {...itemProps} className={[subRowBase, isActive ? rowActive : rowInactive].join(" ")}>
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
                    className={[rowBase, isActive ? rowActive : rowInactive, collapsed ? "lg:justify-center" : "lg:justify-start"].join(
                      " ",
                    )}
                  >
                    <entry.icon size={20} aria-hidden="true" className="shrink-0" />
                    <span className={[labelClassName, collapsed ? "lg:sr-only" : ""].join(" ")}>{entry.label}</span>
                  </Link>
                )}
              </Menu.Item>
            ),
          )}
        </Menu.List>

        <Menu.CollapseTrigger className="m-2 hidden items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:flex">
          {({ collapsed }) => (collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />)}
        </Menu.CollapseTrigger>
      </nav>
    </Menu.Root>
  );
}
