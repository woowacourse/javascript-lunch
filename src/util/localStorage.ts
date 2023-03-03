import { RestaurantType } from "../type";

export const saveOnLocalStorage = (restaurant: RestaurantType) => {
  const key = `key0${window.localStorage.length + 1}`;
  const value = JSON.stringify(restaurant);

  window.localStorage.setItem(key, value);
};

export const getAllDataOnLocalStorage = () => {
  return Array.from({ length: window.localStorage.length }, () => "").map(
    (_, index) =>
      JSON.parse(window.localStorage.getItem(`key0${index + 1}`) || "")
  );
};
