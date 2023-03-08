import { LOCAL_STORAGE_KEY } from '../constant/constant';
import { State } from '../types/restaurantTypes';

const getDataFromLocalStorage = (key: string): State | null => {
  const stateString = localStorage.getItem(key);
  if (!stateString) return null;

  try {
    const state = JSON.parse(stateString) as State;

    if (state.restaurants.length === 0) return null;
    return state;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const setDataToLocalStorage = (key: string = LOCAL_STORAGE_KEY, data: State) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export { getDataFromLocalStorage, setDataToLocalStorage };
