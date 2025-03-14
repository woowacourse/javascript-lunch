import RestaurantCard from "../components/RestaurantCard";

const createRestaurantCards = (restaurantList, events = {}) => {
  return restaurantList.map((restaurant) => RestaurantCard(restaurant, events));
};

export default createRestaurantCards;
