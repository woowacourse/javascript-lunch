import { LIST_ITEM_CONTENTS } from "../contants.js";

export function getRestaurantStorage(key) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
}

export function setRestaurantStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
