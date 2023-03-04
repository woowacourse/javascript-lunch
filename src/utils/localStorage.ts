import { LOCAL_STORAGE_KEY } from '../constants/constants';

const saveToLocalStorage = <T>(data: T[], key: string = LOCAL_STORAGE_KEY) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorage = (key: string = LOCAL_STORAGE_KEY) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

export { saveToLocalStorage, getLocalStorage };
