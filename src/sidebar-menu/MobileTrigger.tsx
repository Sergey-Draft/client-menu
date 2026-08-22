import type { ComponentPropsWithoutRef } from "react";
import { useMenuContext } from "./internal";

export type MobileTriggerProps = Omit<ComponentPropsWithoutRef<"button">, "onClick" | "type">;

// Doesn't have to live inside the sidebar itself — e.g. put it in the app
// header instead, as long as it's rendered inside <Menu.Root>.
export function MobileTrigger(props: MobileTriggerProps) {
  const { mobileOpen, setMobileOpen } = useMenuContext();

  return <button type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} {...props} />;
}
