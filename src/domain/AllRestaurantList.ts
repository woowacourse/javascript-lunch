import RestaurantList from "./RestaurantList";
import setLocalStorageItem from "../utils/setLocalStorageItem";

const AllRestaurantList = new RestaurantList();

export default AllRestaurantList;

const updateLocalStorage = () => {
  setLocalStorageItem(
    "allRestaurants",
    AllRestaurantList.convertedRestaurants()
  );
};

export const getRestaurant = (restaurantName: string) => {
  return AllRestaurantList.bringRestaurantInfo(restaurantName);
};
export const postRestaurant = (restaurant: Restaurant) => {
  AllRestaurantList.add(restaurant);
  updateLocalStorage();
};

export const deleteRestaurant = (restaurantName: string) => {
  AllRestaurantList.delete(restaurantName);
  updateLocalStorage();
};
export const patchRestaurantFavorites = (restaurantName: string) => {
  AllRestaurantList.updateFavorites(restaurantName);
  updateLocalStorage();
};
