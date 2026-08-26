import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useMenuContext } from "./internal";

export interface CollapseTriggerRenderProps {
  collapsed: boolean;
}

export interface CollapseTriggerProps extends Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick" | "type"> {
  children: (props: CollapseTriggerRenderProps) => ReactNode;
}

export function CollapseTrigger({ children, ...rest }: CollapseTriggerProps) {
  const { collapsed, setCollapsed } = useMenuContext();

  return (
    <button type="button" aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)} {...rest}>
      {children({ collapsed })}
    </button>
  );
}
