import RestaurantList from ".";
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

// 다른 폴더로 이동 예정
export const addRestaurant = (newRestaurant: IRestaurant) => {
  restaurants.state.restaurants = [
    ...restaurants.state.restaurants,
    newRestaurant,
  ];
  Storage.saveRestaurants(restaurants.state.restaurants);
};

// 다른 폴더로 이동 예정
export const restoreRestaurants = () => {
  const restoredRestaurants = Storage.loadRestaurants();
  restaurants.state.restaurants =
    restoredRestaurants.length > 0 ? restoredRestaurants : defaultRestaurants;
};
