import { ALL_CATEGORY_VALUE, NAME_VALUE } from "./Constant";

export function getRestaurantListFromLocalstorage(value) {
  return JSON.parse(localStorage.getItem(value));
}

export function stringifyJson(value) {
  return JSON.stringify(value);
}

export function getFoodCategoryFromLocalStorage(value){
  return localStorage.getItem(value) ?? ALL_CATEGORY_VALUE;
}

export function getSortByFromLocalStorage(value){
  return localStorage.getItem(value) ?? NAME_VALUE;
}
    
export function setToLocalStorage(key, restaurants){
  localStorage.setItem(key,stringifyJson(restaurants));
}