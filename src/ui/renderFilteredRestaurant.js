import renderRestaurants from "./renderRestaurant.js";
import eventHandlers from "../events/eventHandlers.js";
import RestaurantCardList from "../components/RestaurantCardList/index.js";

const renderFilteredRestaurants = (restaurantList) => {
  const filteredCardList = RestaurantCardList(
    restaurantList.filteredList,
    eventHandlers.filtered(restaurantList)
  );

  return renderRestaurants(filteredCardList);
};

export default renderFilteredRestaurants;
