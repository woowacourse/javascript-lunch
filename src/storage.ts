import { Restaurant } from './types';

const storage = {
  addData(key: string, data: Restaurant) {
    const localStorageData = localStorage.getItem(key);

    if (localStorageData === null) {
      localStorage.setItem(key, JSON.stringify([data]));
      return;
    }

    const existingData: Restaurant[] = JSON.parse(localStorageData);
    const newData = [...existingData, data];
    localStorage.setItem(key, JSON.stringify(newData));
  },

  getData(key: string): Restaurant[] {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData === null) return [];
    return JSON.parse(localStorageData);
  },

  removeData(key: string, targetId: string) {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData !== null) {
      const existingData: Restaurant[] = JSON.parse(localStorageData);
      const targetIndex = existingData.findIndex(data => data.id === targetId);

      const front = existingData.slice(0, targetIndex);
      const back = existingData.slice(targetIndex + 1, existingData.length);
      localStorage.setItem(key, JSON.stringify([...front, ...back]));
    }
  }
};

export default storage;
