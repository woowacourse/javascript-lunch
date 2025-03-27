import { Restaurant } from "../types/restaurant";

type LocalStorageMap = {
  restaurants: Restaurant[];
};

const getLocalStorage = <T extends keyof LocalStorageMap>(key: T) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as LocalStorageMap[T];
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  }
  return null;
};

const setLocalStorage = <T extends keyof LocalStorageMap>(
  key: T,
  value: LocalStorageMap[T]
) => {
  if (typeof window !== "undefined") {
    try {
      const jsonStringifyValue = JSON.stringify(value);
      localStorage.setItem(key, jsonStringifyValue);
    } catch (error) {
      console.error(error);
    }
  }
};

const removeLocalStorage = <T extends keyof LocalStorageMap>(key: T) => {
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
