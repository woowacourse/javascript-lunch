import Restaurant, {
  CategoryAll,
  RestaurantInfo,
  SortTypeAll,
} from '../../domain/model/Restaurant';

const filterByCategory = (
  restaurantList: Restaurant[],
  category: CategoryAll
) => {
  return restaurantList.filter(
    (restaurant) => restaurant.getInfo().category === category
  );
};

const sortByType = (restaurantList: Restaurant[], type: SortTypeAll) => {
  if (type === 'distance') {
    return [...restaurantList].sort(
      (aRestaurant, bRestaurant) =>
        aRestaurant.getInfo().distance - bRestaurant.getInfo().distance
    );
  }

  return [...restaurantList].sort();
};

export { filterByCategory, sortByType };
