import type { ComponentPropsWithoutRef } from "react";
import { useMenuContext } from "./internal";

export type MobileTriggerProps = Omit<ComponentPropsWithoutRef<"button">, "onClick" | "type">;

// The hamburger button that opens the mobile drawer. It doesn't have to live
// inside the sidebar markup at all — e.g. put it in the app header instead,
// as long as it's rendered inside <Menu.Root>.
export function MobileTrigger(props: MobileTriggerProps) {
  const { mobileOpen, setMobileOpen } = useMenuContext();

  return <button type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} {...props} />;
}
