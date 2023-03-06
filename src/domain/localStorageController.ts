import { LOCAL_STORAGE_KEY } from "../constant";
import { RestaurantType } from "../type";

export const saveOnLocalStorage = (restaurant: RestaurantType) => {
  const key = `${LOCAL_STORAGE_KEY}${window.localStorage.length + 1}`;
  const value = JSON.stringify(restaurant);

  window.localStorage.setItem(key, value);
};

export const getAllDataOnLocalStorage = () => {
  return Array.from({ length: window.localStorage.length }, () => "").map(
    (_, index) =>
      JSON.parse(
        window.localStorage.getItem(`${LOCAL_STORAGE_KEY}${index + 1}`) || ""
      )
  );
};
