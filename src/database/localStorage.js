const localStorage = window.localStorage;

export const setItemToLocalStorage = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
};

export const getItemFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};
