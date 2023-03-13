const store = {
  setLocalStorage(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getLocalStorage(key: string) {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }
  },
};

export default store;
