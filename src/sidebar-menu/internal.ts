import { createContext, useContext, useEffect, useState } from "react";

export interface MenuContextValue {
  /** id of the currently active item/group, e.g. the router pathname */
  activeId: string | undefined;
  /** narrow (icons only) vs wide (icons + labels) */
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

const MOBILE_QUERY = "(max-width: 767px)";

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

/**
 * Standard controlled/uncontrolled pair: if `value` is passed, this component
 * is controlled from outside (e.g. by a router or by useState in the consumer);
 * otherwise it falls back to its own internal state.
 */
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
