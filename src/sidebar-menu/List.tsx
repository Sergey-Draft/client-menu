import type { ComponentPropsWithoutRef } from "react";

export function List(props: ComponentPropsWithoutRef<"ul">) {
  return <ul {...props} />;
}
