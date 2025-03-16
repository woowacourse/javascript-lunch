const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  }
  return null;
};

const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    try {
      const jsonStringifyValue = JSON.stringify(value);
      localStorage.setItem(key, jsonStringifyValue);
    } catch (error) {
      console.error(error);
    }
  }
};

const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

export const localStorageUtils = {
  get: getLocalStorage,
  set: setLocalStorage,
  remove: removeLocalStorage,
  clear: clearLocalStorage,
};
