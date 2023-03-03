const saveToLocalStorage = <T>(data: T[], key: string = "restaurants") => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorage = (key: string = "restaurants") => {
  return JSON.parse(localStorage.getItem(key) ?? "[]");
};

export { saveToLocalStorage, getLocalStorage };
