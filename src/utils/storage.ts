export class StorageController<T> {
  private storage: Storage;
  private key: string;

  constructor(key: string, storage: Storage = localStorage) {
    this.storage = storage;
    this.key = key;
  }

  getStorage(): T | null {
    const item = this.storage.getItem(this.key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  setStorage = (value: T): void => {
    this.storage.setItem(this.key, JSON.stringify(value));
  };

  removeStorage = () => {
    this.storage.removeItem(this.key);
  };

  clearStorage = (): void => {
    this.storage.clear();
  };
}
