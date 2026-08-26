import type { ComponentPropsWithoutRef } from "react";
import { useMenuContext } from "./internal";

export type MobileOverlayProps = Omit<ComponentPropsWithoutRef<"div">, "onClick">;

export function MobileOverlay(props: MobileOverlayProps) {
  const { isMobile, mobileOpen, setMobileOpen } = useMenuContext();

  if (!isMobile || !mobileOpen) return null;

  return <div aria-hidden="true" onClick={() => setMobileOpen(false)} {...props} />;
}
