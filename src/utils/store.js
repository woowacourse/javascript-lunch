const store = {
  setLocalStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  },

  getLocalStorage(key) {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }
  },
};

export default store;
