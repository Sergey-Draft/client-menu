import type { ComponentPropsWithoutRef } from "react";
import { useMenuContext } from "./internal";

export type MobileOverlayProps = Omit<ComponentPropsWithoutRef<"div">, "onClick">;

// The backdrop shown behind the drawer on mobile; clicking it closes the menu.
// Renders nothing outside of "mobile + open", so the consumer doesn't need to
// guard against it themselves.
export function MobileOverlay(props: MobileOverlayProps) {
  const { isMobile, mobileOpen, setMobileOpen } = useMenuContext();

  if (!isMobile || !mobileOpen) return null;

  return <div aria-hidden="true" onClick={() => setMobileOpen(false)} {...props} />;
}
