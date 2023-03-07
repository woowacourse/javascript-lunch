const LocalStorage = {
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
};

export default LocalStorage;
