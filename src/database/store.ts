const store = {
  storage: window.localStorage,

  getData(key: string) {
    return this.storage.getItem(key);
  },

  setData(key: string, data: string) {
    this.storage.setItem(key, data);
  },

  removeData(key: string) {
    this.storage.removeItem(key);
  },
};

export default store;
