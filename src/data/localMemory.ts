const localMemory = {
  getData(id: string) {
    const data = localStorage.getItem(id);

    if (!data) return [];

    return JSON.parse(data);
  },

  setData(id: string, newData: object) {
    localStorage.setItem(id, JSON.stringify(newData));
  },
};

export default localMemory;
