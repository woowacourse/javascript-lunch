const localStore = {
  getParsedItem(key: string) {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item);
  },

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  reset() {
    localStorage.clear();
  },
};

export default localStore;
