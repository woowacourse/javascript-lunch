const LocalStorage = {
  setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getData(key) {
    const item = localStorage.getItem(key);
    if (!item) return [];
    return JSON.parse(item);
  },
};

export default LocalStorage;
