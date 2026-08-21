// Test-only helper: makes useIsMobile() report a given value by stubbing
// window.matchMedia's "matches" result.
export function mockMatchMedia(matches: boolean) {
  window.matchMedia = (query: string) =>
    ({
      matches,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList;
}
