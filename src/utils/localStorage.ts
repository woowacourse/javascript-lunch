import { LOCAL_STORAGE_KEY } from '../constant/constant';
import DEFAULT_RESTAURANT_DATA from '../constant/defaultRestaurantData';
import { State } from '../types/restaurantTypes';

const getDataFromStorage = (key: string): State | null => {
  const stateString = localStorage.getItem(key);

  if (!stateString) return null;

  try {
    const state = JSON.parse(stateString) as State;

    if (!state.restaurants) return null;
    return state;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const setDataToStorage = (key: string = LOCAL_STORAGE_KEY, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const setUpdateDataToStorage = (updateData: any) => {
  const storedData = getDataFromStorage(LOCAL_STORAGE_KEY) || DEFAULT_RESTAURANT_DATA;
  setDataToStorage(LOCAL_STORAGE_KEY, Object.assign({}, storedData, { ...updateData }));
};

export { getDataFromStorage, setDataToStorage, setUpdateDataToStorage };
