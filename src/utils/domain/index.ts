import { CategoryAll, RestaurantInfo } from '../../domain/model/Restaurant';

const filterByCategory = (
  restaurantList: RestaurantInfo[],
  category: CategoryAll
) => {
  return restaurantList.filter((restaurant) => {
    restaurant.category === category;
  });
};
