import { StorageData, StorageInterface } from './interface/Storage';

class Storage implements StorageInterface {
  private storage;

  constructor() {
    this.storage = localStorage;
  }

  get(key: string) {
    const value = this.storage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  set(key: string, value: StorageData) {
    this.storage.setItem(key, JSON.stringify(value));
  }
}

export default Storage;
