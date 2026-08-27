import { createContext, useContext, useEffect, useState } from "react";

export interface MenuContextValue {
  activeId: string | undefined;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("Menu components must be rendered inside <Menu.Root>");
  }
  return ctx;
}

// Below Tailwind's "sm" (640px) is where the consumer switches to an
// off-canvas drawer instead of a persistent bar/rail — this needs to match
// whatever breakpoint the consumer actually renders that drawer at, since
// it's what decides "does the group open as a flyout/sheet or an accordion".
const MOBILE_QUERY = "(max-width: 639px)";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

// Standard controlled/uncontrolled pair: pass `value` to drive it from
// outside (a router, localStorage, whatever), or leave it out and this
// just manages its own state like a plain useState would.
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;

  function set(next: T) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  return [current, set];
}
