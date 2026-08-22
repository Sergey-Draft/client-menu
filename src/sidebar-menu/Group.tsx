import { useState, type ComponentPropsWithoutRef, type FocusEvent, type KeyboardEvent, type ReactNode } from "react";
import { useMenuContext } from "./internal";

export interface TriggerRenderProps {
  isActive: boolean;
  isOpen: boolean;
  /** Spread onto whatever you render as the group's trigger — always a <button>. */
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
  /** ids of the nested Menu.Item children, so the group knows when one of them is active. */
  childIds: string[];
  trigger: (props: TriggerRenderProps) => ReactNode;
  children: ReactNode;
  /** className for the nested <ul> that holds the children (the flyout/accordion box itself). */
  submenuClassName?: string;
}

// A group is a menu item with nested items (e.g. "Clients" > "List"/"Reviews").
// Its submenu opens two different ways depending on the sidebar's width:
//  - wide (or mobile drawer): click-to-toggle accordion, stays open while a child is active
//  - narrow rail: hover/click flyout, closes again once the pointer/focus leaves
export function Group({ id, childIds, trigger, children, submenuClassName, ...rest }: MenuGroupProps) {
  const { activeId, collapsed, isMobile } = useMenuContext();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isActive = activeId !== undefined && childIds.includes(activeId);
  const isFlyout = collapsed && !isMobile;
  const isOpen = isFlyout ? hovered || clicked : clicked || isActive;
  const submenuId = `${id}-submenu`;

  function close() {
    setClicked(false);
    setHovered(false);
  }

  function handleMouseLeave() {
    setHovered(false);
    if (isFlyout) setClicked(false);
  }

  function handleBlur(event: FocusEvent<HTMLLIElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLLIElement>) {
    if (event.key === "Escape") close();
  }

  return (
    // The <li> itself isn't interactive — these handlers just track hover/focus
    // leaving the group (trigger + submenu) so the flyout/accordion can close.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      {...rest}
      onMouseEnter={() => setHovered(true)}
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
          onClick: () => setClicked((open) => !open),
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
