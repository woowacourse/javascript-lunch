const setLocalStorageItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItem = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

export { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem };
