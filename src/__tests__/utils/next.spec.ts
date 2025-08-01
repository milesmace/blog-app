import { isBrowser } from "@/utils";

describe('isBrowser', () => {
  it('returns true when called in a browser environment', () => {
    expect(isBrowser()).toBe(true);
  });

  it('returns false when called in a server environment', () => {
    // @ts-expect-error - we're deliberately deleting window
    delete globalThis.window;

    expect(isBrowser()).toBe(false);
  });
});
