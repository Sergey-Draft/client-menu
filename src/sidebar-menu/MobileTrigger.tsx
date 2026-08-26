import type { ComponentPropsWithoutRef } from "react";
import { useMenuContext } from "./internal";

export type MobileTriggerProps = Omit<ComponentPropsWithoutRef<"button">, "onClick" | "type">;

export function MobileTrigger(props: MobileTriggerProps) {
  const { mobileOpen, setMobileOpen } = useMenuContext();

  return <button type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} {...props} />;
}
