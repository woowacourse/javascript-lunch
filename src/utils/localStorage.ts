export const loadFromLocalStorage = (key: string) => {
  const item = window.localStorage.getItem(key);
  if (item) return JSON.parse(item);
};

export const updateToLocalStorage = (key: string, value: string | object | number) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
