import RestaurantCard from "../RestaurantCard";

const RestaurantCardList = (
  restaurantList,
  { clickFavorite, clickCard } = {}
) => {
  return restaurantList.map((restaurant) =>
    RestaurantCard(restaurant, { clickFavorite, clickCard })
  );
};

export default RestaurantCardList;
