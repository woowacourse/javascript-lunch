const LocalStorage = {
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  },
  setLocalStorage(key, value) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  },
};
export default LocalStorage;
