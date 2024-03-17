import { Restaurant } from './types';
import Matzip from './matzip';
import matzipList from './mock/restaurants';

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

  updateData(matzip: Matzip) {
    localStorage.setItem(MATZIP_DATA, JSON.stringify(matzip.getRestaurants()));
  },

  setMockData() {
    localStorage.setItem(MATZIP_DATA, JSON.stringify(matzipList));
  },
};

export default storage;
