import setLocalStorageItem from "./setLocalStorageItem";

const getLocalStorageItem = (key: string, defaultValue: any) => {
  const localStorage = window.localStorage;

  if (localStorage.getItem(key) === null) {
    setLocalStorageItem(key, defaultValue);
  }

  return JSON.parse(localStorage.getItem(key)!);
};

export default getLocalStorageItem;
