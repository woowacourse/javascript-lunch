import { LOCAL_STORAGE_KEY } from "../constant";
import { RestaurantType } from "../type";
import { findLocalStorageKeys } from "../util/findKeyInLocalStorage";
import { $ } from "../util/selector";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

export const saveRestaurantsInLocalStorage = (restaurant: RestaurantType) => {
  const key = `${RESTAURANT}${restaurant.name}${
    findLocalStorageKeys(RESTAURANT).length + 1
  }`;
  const value = JSON.stringify(restaurant);

  localStorage.setItem(key, value);
};

export const getAllRestaurantsInLocalStorage = () => {
  return findLocalStorageKeys(RESTAURANT).map((key) =>
    JSON.parse(localStorage.getItem(`${key}`) || "[]")
  );
};

export const saveSelectedOption = (
  optionKey: string,
  selectedCategory: string
) => {
  localStorage.setItem(optionKey, selectedCategory);

  const selectedOption = $(
    `option[value=${selectedCategory}]`
  ) as HTMLOptionElement;
  selectedOption.selected = true;
};
