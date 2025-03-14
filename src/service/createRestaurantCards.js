import RestaurantCard from "../components/RestaurantCard";

const createRestaurantCards = (restaurantList) => {
  return restaurantList.map((restaurant) => RestaurantCard(restaurant));
};

export default createRestaurantCards;
