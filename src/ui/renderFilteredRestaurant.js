import renderRestaurants from "./renderRestaurant.js";
import RestaurantCardList from "../components/RestaurantCardList/index.js";
import restaurantCardEvents from "../events/restaurantCardEvents.js";

const renderFilteredRestaurants = (restaurantList) => {
  const filteredCardList = RestaurantCardList(
    restaurantList.filteredList,
    restaurantCardEvents(restaurantList)
  );

  return renderRestaurants(filteredCardList);
};

export default renderFilteredRestaurants;
