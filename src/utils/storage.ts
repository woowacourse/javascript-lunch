// function storageController(storage: Storage) {
//   function getStorage(key: string) {
//     const item = storage.getItem(key);

//     if (item) {
//       return JSON.parse(item);
//     }

//     return [];
//   }

//   function setStorage<T>(key: string, value: T) {
//     storage.setItem(key, JSON.stringify(value));
//   }

//   function removeStorage(key: string) {
//     storage.removeItem(key);
//   }

//   function clearStorage() {
//     storage.clear();
//   }

//   return {
//     getStorage,
//     setStorage,
//     removeStorage,
//     clearStorage,
//   };
// }

// export const { getStorage, setStorage, removeStorage } =
//   storageController(localStorage);

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

  return {
    get: getStorage,
    set: setStorage,
    remove: removeStorage,
    clear: clearStorage,
  };
}

export const restuarantData = createStorage("restaurant");
