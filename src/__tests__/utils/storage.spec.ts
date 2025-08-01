import { loadFromStorage, removeFromStorage, saveToStorage } from '@/utils';
import * as nextUtils from '@/utils/next';

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    vi.spyOn(nextUtils, 'isBrowser').mockReturnValue(true);
  });

  describe('loadFromStorage', () => {
    it('throws an error when called in a server environment', () => {
      vi.spyOn(nextUtils, 'isBrowser').mockReturnValue(false);
      expect(() => loadFromStorage('key')).toThrow();
    });

    it('returns parsed value if valid JSON exists', () => {
      localStorage.setItem('user', JSON.stringify({ name: 'Alice' }));
      const result = loadFromStorage<{ name: string }>('user');
      expect(result).toEqual({ name: 'Alice' });
    });

    it('returns null if key does not exist and no fallback is provided', () => {
      const result = loadFromStorage('nonexistent');
      expect(result).toBeNull();
    });

    it('returns fallback if key does not exist and fallback is provided', () => {
      const fallback = { name: 'Fallback' };
      const result = loadFromStorage('nonexistent', fallback);
      expect(result).toEqual(fallback);
    });

    it('returns fallback if stored value is invalid JSON', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      localStorage.setItem('broken', 'not json');
      const fallback = { name: 'Default' };
      const result = loadFromStorage('broken', fallback);
      expect(result).toEqual(fallback);

      warnSpy.mockRestore();
    });

    it('returns null if stored value is invalid JSON and no fallback is provided', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      localStorage.setItem('invalid', 'not json');
      const result = loadFromStorage('invalid');
      expect(result).toBeNull();

      warnSpy.mockRestore();
    });

    it('logs a warning when JSON.parse fails', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      localStorage.setItem('bad', 'not json');

      loadFromStorage('bad');
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to parse localStorage'),
        expect.any(SyntaxError),
      );

      warnSpy.mockRestore();
    });
  });

  describe('saveToStorage', () => {
    it('throws an error when called in a server environment', () => {
      vi.spyOn(nextUtils, 'isBrowser').mockReturnValue(false);
      expect(() => saveToStorage('key', 'value')).toThrow();
    });

    it('stores the value as a JSON string', () => {
      const data = { id: 123, token: 'abc' };
      saveToStorage('session', data);
      expect(localStorage.getItem('session')).toBe(JSON.stringify(data));
    });

    it('logs a warning if JSON.stringify fails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const circular: any = {};
      circular.self = circular;

      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      saveToStorage('loop', circular);

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to stringify localStorage'),
        expect.any(TypeError),
      );

      warnSpy.mockRestore();
    });
  });

  describe('removeFromStorage', () => {
    it('throws an error when called in a server environment', () => {
      vi.spyOn(nextUtils, 'isBrowser').mockReturnValue(false);
      expect(() => removeFromStorage('key')).toThrow();
    });

    it('removes the item from localStorage', () => {
      localStorage.setItem('temp', 'value');
      removeFromStorage('temp');
      expect(localStorage.getItem('temp')).toBeNull();
    });
  });
});
