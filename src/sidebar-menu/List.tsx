import type { ComponentPropsWithoutRef } from "react";

// A plain <ul>: no styling opinion, just the tag a list of nav items needs.
export function List(props: ComponentPropsWithoutRef<"ul">) {
  return <ul {...props} />;
}
