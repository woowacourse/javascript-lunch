import { RestaurantType } from "../type";

export const saveOnLocalStorage = (restaurant: RestaurantType) => {
  const key = `key0${window.localStorage.length + 1}`;
  const value = JSON.stringify(restaurant);

  window.localStorage.setItem(key, value);
};
