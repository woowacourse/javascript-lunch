const storage = {
  addData<T>(key: string, data: T) {
    const localStorageData = localStorage.getItem(key);

    if (localStorageData === null) {
      localStorage.setItem(key, JSON.stringify([data]));
      return;
    }

    const existingData: T[] = JSON.parse(localStorageData);
    const newData = [...existingData, data];
    localStorage.setItem(key, JSON.stringify(newData));
  },

  getData<T>(key: string): T[] {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData === null) return [];
    return JSON.parse(localStorageData);
  },

  modifyData<T>(key: string, newList: T[]) {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData !== null) {
      localStorage.setItem(key, JSON.stringify(newList));
    }
  }
};

export default storage;
