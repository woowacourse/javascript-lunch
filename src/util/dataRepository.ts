import { RestaurantDataProp } from "../../types/types";

const DATA_KEY = "restaurantData";

export function getAllData(): RestaurantDataProp[] {
  return JSON.parse(localStorage.getItem(DATA_KEY) || "[]");
}

export function postData(data: RestaurantDataProp[]) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}
