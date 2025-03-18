import { LIST_ITEM_CONTENTS } from "../contants.js";

export function getRestaurantStorage() {
  if (!localStorage.getItem("restaurant")) {
    localStorage.setItem("restaurant", JSON.stringify(LIST_ITEM_CONTENTS));
  }
  return JSON.parse(localStorage.getItem("restaurant"));
}

export function setRestaurantStorage(restaurantInformation) {
  localStorage.setItem("restaurant", JSON.stringify(restaurantInformation));
}
