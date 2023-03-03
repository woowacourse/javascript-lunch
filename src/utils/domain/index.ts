import {
  CategoryAll,
  RestaurantInfo,
  SortTypeAll,
} from '../../domain/model/Restaurant';

const filterByCategory = (
  restaurantList: RestaurantInfo[],
  category: CategoryAll
) => {
  return restaurantList.filter((restaurant) => {
    restaurant.category === category;
  });
};

const sortByType = (restaurantList: RestaurantInfo[], type: SortTypeAll) => {
  if (type === 'distance') {
    return [...restaurantList].sort(
      (aRestaurant, bRestaurant) => bRestaurant.distance - aRestaurant.distance
    );
  }

  return [...restaurantList].sort();
};

export { filterByCategory, sortByType };
