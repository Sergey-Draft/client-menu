import { useEffect, type ReactNode } from "react";
import { MenuContext, useControllableState, useIsMobile } from "./internal";

export interface MenuRootProps {
  /**
   * id of whatever is currently active — pass the router pathname to integrate
   * with a router, or a piece of local state for a plain useState setup.
   */
  activeId?: string;

  /** Narrow (icons only) vs wide (icons + labels). Omit to manage it internally. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;

  /** Whether the mobile drawer is open. Omit to manage it internally. */
  mobileOpen?: boolean;
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;

  children: ReactNode;
}

export function Root({
  activeId,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  mobileOpen: mobileOpenProp,
  defaultMobileOpen = false,
  onMobileOpenChange,
  children,
}: MenuRootProps) {
  const [collapsed, setCollapsed] = useControllableState(collapsedProp, defaultCollapsed, onCollapsedChange);
  const [mobileOpen, setMobileOpen] = useControllableState(mobileOpenProp, defaultMobileOpen, onMobileOpenChange);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile && mobileOpen) setMobileOpen(false);
  }, [isMobile, mobileOpen, setMobileOpen]);

  return (
    <MenuContext.Provider value={{ activeId, collapsed, setCollapsed, isMobile, mobileOpen, setMobileOpen }}>
      {children}
    </MenuContext.Provider>
  );
}
