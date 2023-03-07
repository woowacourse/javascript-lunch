import RestaurantList from ".";
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
