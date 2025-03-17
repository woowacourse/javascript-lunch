const localStorage = window.localStorage;

export const setItemToLocalStorage = <T>(key: string, value: T) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
};

export const getItemFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (data === null) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};
