import { LOCAL_INPUT, FORM_VALUE } from "./Constant";

export function getRestaurantListFromLocalstorage(value) {
  return JSON.parse(localStorage.getItem(value));
}

export function stringifyJson(value) {
  return JSON.stringify(value);
}

export function getFoodCategoryFromLocalStorage(value){
  return localStorage.getItem(value) ?? LOCAL_INPUT.ALL_CATEGORY;
}

export function getSortByFromLocalStorage(value){
  return localStorage.getItem(value) ?? FORM_VALUE.NAME;
}
    
export function setToLocalStorage(key, restaurants){
  localStorage.setItem(key,stringifyJson(restaurants));
}