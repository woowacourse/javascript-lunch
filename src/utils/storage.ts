function createStorage(key: string, storage = window.localStorage) {
  function getStorage() {
    const item = storage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return [];
  }

  function setStorage<T>(value: T) {
    storage.setItem(key, JSON.stringify(value));
  }

  function removeStorage() {
    storage.removeItem(key);
  }

  function clearStorage() {
    storage.clear();
  }

  function findItem(id: string) {
    const items = getStorage();
    return items.find((item) => item.id === id) || null;
  }

  return {
    get: getStorage,
    set: setStorage,
    remove: removeStorage,
    clear: clearStorage,
    find: findItem,
  };
}

export const restuarantData = createStorage("restaurant");
