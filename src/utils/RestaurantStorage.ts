import { Restaurant } from "../shared/types";

const STORAGE_KEY = "restaurants";

export const GetAllRestaurantFromStorage = () => {
  const data = localStorage.getItem(`${STORAGE_KEY}`) || "[]";
  return JSON.parse(data) as Restaurant[];
};

export const SetRestaurantInStorage = (restaurants: Restaurant[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
};
