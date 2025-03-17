import { createStorage, type StorageEngine } from "./createStorage";

const localStorageEngine: StorageEngine = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
};

const localStorageStore = createStorage(localStorageEngine);

export default localStorageStore;
