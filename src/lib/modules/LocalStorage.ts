import { LocalStorageKeyType } from '../types';

export default class LocalStorage {
  static get(key: LocalStorageKeyType) {
    return localStorage.getItem(key);
  }

  static set(key: LocalStorageKeyType, value: string) {
    localStorage.setItem(key, value);
  }

  static remove(key: LocalStorageKeyType) {
    localStorage.removeItem(key);
  }
}
