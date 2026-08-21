// Adds jest-dom's matchers (toBeInTheDocument, toHaveAttribute, etc.) to vitest's expect.
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// We don't use vitest's `globals: true`, so Testing Library's own auto-cleanup
// (which detects a global `afterEach`) never kicks in — do it explicitly.
afterEach(cleanup);

// jsdom doesn't implement matchMedia. Default to "not mobile"; tests that care
// about the mobile breakpoint override this themselves (see mockMatchMedia in
// src/sidebar-menu/test-utils.ts).
window.matchMedia ??= (query: string) =>
  ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }) as unknown as MediaQueryList;
