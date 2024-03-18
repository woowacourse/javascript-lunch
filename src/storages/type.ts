export interface CustomStorage<T, K> {
  get: () => T;
  set: (item: K) => void;
  remove: (name: string) => void;
  update: (item: K[]) => void;
}
