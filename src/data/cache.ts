const cache = {
  getCache(id: string) {
    const data = localStorage.getItem(id);

    if (!data) return null;

    return JSON.parse(data);
  },

  setCache(id: string, newData: object) {
    localStorage.setItem(id, JSON.stringify(newData));
  },
};

export default cache;
