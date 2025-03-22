import RestaurantCard from "../RestaurantCard";

const RestaurantCardList = (restaurantList, events = {}) => {
  return restaurantList.map((restaurant) => RestaurantCard(restaurant, events));
};

export default RestaurantCardList;
