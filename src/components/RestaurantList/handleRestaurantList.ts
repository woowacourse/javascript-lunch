import RestaurantList from ".";
import { filterRestaurants, sortRestaurants } from "../../domain/restaurant";
import { restaurants } from "../../domain/restaurants";
import defaultRestaurants from "../../tools/defaultRestaurants";
import Storage from "../../tools/Storage";
import IRestaurant from "../../type/IRestaurant";

export const renderRestaurantList = () => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.render();
  }
};

export const addRestaurant = (newRestaurant: IRestaurant) => {
  restaurants.state.restaurants = [
    ...restaurants.state.restaurants,
    newRestaurant,
  ];
  Storage.saveRestaurants(restaurants.state.restaurants);
};

export const selectRestaurants = (): IRestaurant[] => {
  const { filter, sort, menuTab } = restaurants.state;
  const filteredRestaurants = filterRestaurants(
    restaurants.state.restaurants,
    filter,
    menuTab
  );
  return sortRestaurants(filteredRestaurants, sort);
};

export const restoreRestaurants = () => {
  const restoredRestaurants = Storage.loadRestaurants();
  restaurants.state.restaurants =
    restoredRestaurants.length > 0 ? restoredRestaurants : defaultRestaurants;
};
