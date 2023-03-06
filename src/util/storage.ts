const storage = {
  getData(key: string) {
    const data = localStorage.getItem(key);

    return data === null ? null : JSON.parse(data);
  },

  setData(key: string, newData: Object) {
    localStorage.setItem(key, JSON.stringify(newData));
  },
};

export default storage;
