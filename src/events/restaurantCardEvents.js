import clickCard from "./clickCard";
import clickFavorite from "./clickFavorite";

const restaurantCardEvents = (restaurantList) => {
  return {
    clickCard: (restaurant) => clickCard(restaurant, restaurantList),
    clickFavorite: () => clickFavorite(restaurantList),
  };
};

export default restaurantCardEvents;
