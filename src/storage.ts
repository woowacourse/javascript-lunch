import { Restaurant } from './types';

// const MATZIP_DATA = 'matzipData';
// const FAVORITE_MATZIP_DATA = 'favoriteMatzipData';

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

  removeData(key: string) {
    localStorage.removeItem(key);
  },
};

export default storage;
