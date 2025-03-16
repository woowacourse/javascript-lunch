import { RestaurantType } from '../types/restaurants';
import Restaurant from './Restaurant';

interface RestaurantListProps {
  restaurants: RestaurantType[];
}

const RestaurantList = (props: RestaurantListProps) => {
  const { restaurants } = props;

  return `
    <ul class="restaurant-list">
      ${restaurants
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
