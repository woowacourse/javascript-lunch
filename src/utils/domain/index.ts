import {
  CategoryAll,
  Restaurant,
  SortTypeAll,
} from '../../domain/model/RestaurantList';

const filterByCategory = (
  restaurantList: Restaurant[],
  category: CategoryAll
) => {
  return restaurantList.filter(
    (restaurant) => restaurant.category === category
  );
};

const sortByType = (restaurantList: Restaurant[], type: SortTypeAll) => {
  if (type === 'distance') {
    return [...restaurantList].sort(
      (aRestaurant, bRestaurant) => aRestaurant.distance - bRestaurant.distance
    );
  }

  return [...restaurantList].sort((aRestaurant, bRestaurant) => {
    return aRestaurant.name.localeCompare(bRestaurant.name);
  });
};

export { filterByCategory, sortByType };
