import { useState, type ComponentPropsWithoutRef, type FocusEvent, type KeyboardEvent, type ReactNode } from "react";
import { useMenuContext } from "./internal";

export interface TriggerRenderProps {
  isActive: boolean;
  isOpen: boolean;
  triggerProps: {
    type: "button";
    "aria-expanded": boolean;
    "aria-controls": string;
    "data-active": "true" | "false";
    "data-open": "true" | "false";
    onClick: () => void;
  };
}

export interface MenuGroupProps
  extends Omit<ComponentPropsWithoutRef<"li">, "children" | "onMouseEnter" | "onMouseLeave" | "onBlur" | "onKeyDown"> {
  id: string;
  childIds: string[];
  trigger: (props: TriggerRenderProps) => ReactNode;
  children: ReactNode;
  submenuClassName?: string;
}

export function Group({ id, childIds, trigger, children, submenuClassName, ...rest }: MenuGroupProps) {
  const { activeId, collapsed, isMobile } = useMenuContext();

  // Flyout (narrow desktop rail): a transient popover, open only while hovered/clicked.
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  // Accordion (wide desktop / mobile drawer): open by default whenever a child is
  // active, but the user can still click the trigger to force it open or closed.
  // `null` means "no explicit choice yet, fall back to isActive".
  const [forcedOpen, setForcedOpen] = useState<boolean | null>(null);
  // A fresh navigation always wins over a stale "user closed this" choice,
  // otherwise a group could get stuck collapsed even though its own child is
  // active. Resetting during render (not in an effect) avoids an extra paint.
  const [lastActiveId, setLastActiveId] = useState(activeId);
  if (lastActiveId !== activeId) {
    setLastActiveId(activeId);
    setForcedOpen(null);
  }

  // Switching between the flyout and accordion layouts should start clean —
  // otherwise a group left open before collapsing (or hovered in passing on
  // the way to some other click) can reappear open in the other layout.
  const [lastCollapsed, setLastCollapsed] = useState(collapsed);
  if (lastCollapsed !== collapsed) {
    setLastCollapsed(collapsed);
    setFlyoutOpen(false);
    setForcedOpen(null);
  }

  const isActive = activeId !== undefined && childIds.includes(activeId);
  const isFlyout = collapsed && !isMobile;
  const isOpen = isFlyout ? flyoutOpen : (forcedOpen ?? isActive);
  const submenuId = `${id}-submenu`;

  function toggle() {
    if (isFlyout) {
      setFlyoutOpen((open) => !open);
    } else {
      setForcedOpen((current) => !(current ?? isActive));
    }
  }

  function handleMouseLeave() {
    setFlyoutOpen(false);
  }

  function handleBlur(event: FocusEvent<HTMLLIElement>) {
    if (isFlyout && !event.currentTarget.contains(event.relatedTarget)) setFlyoutOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLLIElement>) {
    if (isFlyout && event.key === "Escape") setFlyoutOpen(false);
  }

  return (
    // The <li> itself isn't interactive; these just track hover/focus leaving
    // the flyout so it can dismiss itself, same as a native popover would.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      {...rest}
      onMouseEnter={() => setFlyoutOpen(true)}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {trigger({
        isActive,
        isOpen,
        triggerProps: {
          type: "button",
          "aria-expanded": isOpen,
          "aria-controls": submenuId,
          "data-active": isActive ? "true" : "false",
          "data-open": isOpen ? "true" : "false",
          onClick: toggle,
        },
      })}
      {isOpen && (
        <ul id={submenuId} className={submenuClassName}>
          {children}
        </ul>
      )}
    </li>
  );
}
