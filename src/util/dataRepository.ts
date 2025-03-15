import { IRestaurantDataProp } from "../../types/types";

const DATA_KEY = "restaurantData";

export function getAllData(): IRestaurantDataProp[] {
  return JSON.parse(localStorage.getItem(DATA_KEY) || "[]");
}

export function postData(data: IRestaurantDataProp[]) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}
