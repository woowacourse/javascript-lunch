import setLocalStorageItem from "./setLocalStorageItem";

const getLocalStorageItem = (key: string, defaultValue: any) => {
  const localStorage = window.localStorage;

  const valueInLocalStorage = localStorage.getItem(key);
  if (valueInLocalStorage === null) {
    setLocalStorageItem(key, defaultValue);
  }

  return JSON.parse(localStorage.getItem(key) as string);
};

export default getLocalStorageItem;
