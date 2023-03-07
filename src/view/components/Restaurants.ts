import { Restaurant } from '../../domain/model/LunchRecommendation';
import { Restaurant as RestaurantItem } from './Restaurant';

interface RestaurantProps {
  restaurants: Restaurant[];
}

function Restaurants({ restaurants }: RestaurantProps) {
  return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${restaurants.map(({ info }) => RestaurantItem({ info })).join('')}
      </ul>
    </section>
  `;
}

export { Restaurants };
