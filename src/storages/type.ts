export interface CustomStorage<T, K> {
  getAll: () => T;
  set: (item: K) => void;
  setAll: (items: T) => void;
}
