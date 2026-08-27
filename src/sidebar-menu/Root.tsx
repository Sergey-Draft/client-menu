import { useEffect, type ReactNode } from "react";
import { MenuContext, useControllableState, useIsMobile } from "./internal";

export interface MenuRootProps {
  activeId?: string;

  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;

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

  // If the viewport grows past the mobile breakpoint while the drawer is
  // open, drop the stale "open" state so it isn't sitting there next time
  // the user resizes back down.
  useEffect(() => {
    if (!isMobile && mobileOpen) setMobileOpen(false);
  }, [isMobile, mobileOpen, setMobileOpen]);

  return (
    <MenuContext.Provider value={{ activeId, collapsed, setCollapsed, isMobile, mobileOpen, setMobileOpen }}>
      {children}
    </MenuContext.Provider>
  );
}
