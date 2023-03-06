import { LOCAL_STORAGE_KEY } from "../constant";
import { RestaurantType } from "../type";
import { findLocalStorageKeys } from "../util/findKeyInLocalStorage";
import { $ } from "../util/selector";

export const saveRestaurantsInLocalStorage = (restaurant: RestaurantType) => {
  const key = `${LOCAL_STORAGE_KEY}${
    findLocalStorageKeys(LOCAL_STORAGE_KEY).length + 1
  }`;
  const value = JSON.stringify(restaurant);

  localStorage.setItem(key, value);
};

export const getAllRestaurantsInLocalStorage = () => {
  return findLocalStorageKeys(LOCAL_STORAGE_KEY).map((_, index) =>
    JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY}${index + 1}`) || "[]")
  );
};

export const saveSelectedCategory = (selectedCategory: string) => {
  localStorage.setItem("category", selectedCategory);

  const selectedOption = $(
    `option[value=${selectedCategory}]`
  ) as HTMLOptionElement;
  selectedOption.selected = true;
};
