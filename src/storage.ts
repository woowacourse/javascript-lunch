import { Restaurant } from './types';

const MATZIP_DATA = 'matzipData';

const storage = {
  addData(data: Restaurant) {
    const localStorageData = localStorage.getItem(MATZIP_DATA);

    if (localStorageData === null) {
      localStorage.setItem(MATZIP_DATA, JSON.stringify([data]));
      return;
    }

    const existingData: Restaurant[] = JSON.parse(localStorageData);
    const newData = [...existingData, data];
    localStorage.setItem(MATZIP_DATA, JSON.stringify(newData));
  },

  getData(): Restaurant[] {
    const localStorageData = localStorage.getItem(MATZIP_DATA);
    if (localStorageData === null) return [];
    return JSON.parse(localStorageData);
  },

  removeData(targetId: string) {
    const localStorageData = localStorage.getItem(MATZIP_DATA);
    if (localStorageData !== null) {
      const existingData: Restaurant[] = JSON.parse(localStorageData);
      const targetIndex = existingData.findIndex(data => data.id === targetId);

      const front = existingData.slice(0, targetIndex);
      const back = existingData.slice(targetIndex + 1, existingData.length);
      localStorage.setItem(MATZIP_DATA, JSON.stringify([...front, ...back]));
    }
  }
};

export default storage;
