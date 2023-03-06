import { RESTAURANT } from "./Constant";

export function getRestaurantListFromLocalstorage() {
  return JSON.parse(localStorage.getItem(RESTAURANT));
}

export function stringifyJson(restaurant) {
  return JSON.stringify(restaurant);
}
