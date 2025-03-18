function storageController(storage: Storage) {
  function getStorage(key: string) {
    const item = storage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  function setStorage<T>(key: string, value: T) {
    storage.setItem(key, JSON.stringify(value));
  }

  function removeStorage(key: string) {
    storage.removeItem(key);
  }

  function clearStorage() {
    storage.clear();
  }

  return {
    getStorage,
    setStorage,
    removeStorage,
    clearStorage,
  };
}

export const { getStorage, setStorage, removeStorage } =
  storageController(localStorage);
