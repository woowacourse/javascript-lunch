export interface StorageEngine {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const createStorage = (engine: StorageEngine) => ({
  get<T>(key: string): T | null {
    const raw = engine.getItem(key);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set<T>(key: string, value: T): void {
    engine.setItem(key, JSON.stringify(value));
  },
});
