import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useMenuContext } from "./internal";

export interface ItemRenderProps {
  isActive: boolean;
  itemProps: {
    "aria-current": "page" | undefined;
    "data-active": "true" | "false";
    onClick: () => void;
  };
}

export interface MenuItemProps extends Omit<ComponentPropsWithoutRef<"li">, "children"> {
  id: string;
  onSelect?: () => void;
  children: (props: ItemRenderProps) => ReactNode;
}

// Item never renders the clickable element itself — the render prop decides
// whether that's a <button>, an <a>, or a router <Link>. That's what keeps
// routing entirely out of this package.
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
