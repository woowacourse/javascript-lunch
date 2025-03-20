import { TAB } from '../constants/restaurantTypes';
import { RestaurantType } from '../types/restaurants';
import Restaurant from './Restaurant';

interface RestaurantListProps {
  restaurants: RestaurantType[];
  currentTab: string;
}

const RestaurantList = (props: RestaurantListProps) => {
  const { restaurants, currentTab } = props;

  const filteredRestaurants =
    currentTab === TAB.FAVORITE
      ? restaurants.filter((restaurant) => restaurant.isFavorite)
      : restaurants;

  return `
    <ul class="restaurant-list">
      ${filteredRestaurants
        ?.map((restaurant) =>
          Restaurant({
            ...restaurant,
          })
        )
        .join('')}
    </ul>
  `;
};

export default RestaurantList;
