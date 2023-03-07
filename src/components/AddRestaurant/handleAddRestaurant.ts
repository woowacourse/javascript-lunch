import IRestaurant from "../../type/IRestaurant";
import RestaurantList from "../RestaurantList";

export const addNewRestaurant = (newRestaurant: IRestaurant) => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.addRestaurant(newRestaurant);
  }
};
