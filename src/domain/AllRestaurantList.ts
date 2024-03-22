import RestaurantList from "./RestaurantList";
import setLocalStorageItem from "../utils/setLocalStorageItem";

const AllRestaurantList = new RestaurantList();

export default AllRestaurantList;

export const ALL_RESTAURANTS_LOCAL_STORAGE_KEY = "allRestaurants";

const updateAllRestaurantsInStorage = () => {
  setLocalStorageItem(
    ALL_RESTAURANTS_LOCAL_STORAGE_KEY,
    AllRestaurantList.convertedRestaurants()
  );
};

export const getRestaurant = (restaurantName: string) => {
  return AllRestaurantList.bringRestaurantInfo(restaurantName);
};
export const postRestaurant = (restaurant: Restaurant) => {
  AllRestaurantList.add(restaurant);
  updateAllRestaurantsInStorage();
};

export const deleteRestaurant = (restaurantName: string) => {
  AllRestaurantList.delete(restaurantName);
  updateAllRestaurantsInStorage();
};
export const patchRestaurantFavorites = (restaurantName: string) => {
  AllRestaurantList.updateFavorites(restaurantName);
  updateAllRestaurantsInStorage();
};
