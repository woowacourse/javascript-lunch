const store = {
  setLocalStorage<T>(key: string, data: T) {
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
