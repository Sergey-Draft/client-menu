import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useMenuContext } from "./internal";

export interface ItemRenderProps {
  isActive: boolean;
  /** Spread onto whatever clickable element you render — <a>, <Link>, <button>. */
  itemProps: {
    "aria-current": "page" | undefined;
    "data-active": "true" | "false";
    onClick: () => void;
  };
}

export interface MenuItemProps extends Omit<ComponentPropsWithoutRef<"li">, "children"> {
  id: string;
  /** Called on click, before the mobile drawer (if any) closes. */
  onSelect?: () => void;
  children: (props: ItemRenderProps) => ReactNode;
}

export function Item({ id, onSelect, children, ...rest }: MenuItemProps) {
  const { activeId, isMobile, setMobileOpen } = useMenuContext();
  const isActive = activeId === id;

  function handleClick() {
    onSelect?.();
    if (isMobile) setMobileOpen(false);
  }

  return (
    <li {...rest}>
      {children({
        isActive,
        itemProps: {
          "aria-current": isActive ? "page" : undefined,
          "data-active": isActive ? "true" : "false",
          onClick: handleClick,
        },
      })}
    </li>
  );
}
