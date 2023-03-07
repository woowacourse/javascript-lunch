import RestaurantList from ".";
import { filterRestaurants, sortRestaurants } from "../../domain/restaurant";
import Storage from "../../tools/Storage";
import IRestaurant from "../../type/IRestaurant";

export const renderRestaurantList = () => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.render();
  }
};

export const addRestaurant = (newRestaurant: IRestaurant) => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.listState.restaurants = [
      ...restaurantList.listState.restaurants,
      newRestaurant,
    ];
    Storage.saveRestaurants(restaurantList.listState.restaurants);
  }
};

export const selectRestaurants = (): IRestaurant[] => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    const { filter, sort } = restaurantList.listState;
    const restaurants = filterRestaurants(
      restaurantList.listState.restaurants,
      filter
    );
    return sortRestaurants(restaurants, sort);
  }
  return [];
};
