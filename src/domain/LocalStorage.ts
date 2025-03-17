export default class LocalStorage {
  static getItems<T>(storageKey: string): T[] {
    const storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  static saveItems<T>(items: T[], storageKey: string): void {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }
}
