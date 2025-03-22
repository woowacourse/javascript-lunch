import { RestaurantProp } from "../../types/types";

const DATA_KEY = "restaurantData";

export function getAllData(): RestaurantProp[] {
  return JSON.parse(localStorage.getItem(DATA_KEY) || "[]");
}

export function postData(data: RestaurantProp[]) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}
