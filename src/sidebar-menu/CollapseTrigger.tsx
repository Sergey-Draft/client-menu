import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useMenuContext } from "./internal";

export interface CollapseTriggerRenderProps {
  collapsed: boolean;
}

export interface CollapseTriggerProps extends Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick" | "type"> {
  /** Lets you swap the icon depending on which way the toggle points. */
  children: (props: CollapseTriggerRenderProps) => ReactNode;
}

// The button at the bottom of the sidebar that switches narrow <-> wide.
export function CollapseTrigger({ children, ...rest }: CollapseTriggerProps) {
  const { collapsed, setCollapsed } = useMenuContext();

  return (
    <button type="button" aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)} {...rest}>
      {children({ collapsed })}
    </button>
  );
}
