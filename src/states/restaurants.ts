import { LUNCH_STORAGE_ID } from "../constants/storageId";
import Restaurants from "../domain/Restaurants";

const initRestaurantList = JSON.parse(
  localStorage.getItem(LUNCH_STORAGE_ID) ?? "[]"
);
const restaurantState = new Restaurants(initRestaurantList);

export default restaurantState;
