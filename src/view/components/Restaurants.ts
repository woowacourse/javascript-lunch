import './Restaurant.css';

import { Restaurant as IRestaurant, RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { Restaurant } from './Restaurant';

interface RestaurantProps {
  restaurants: IRestaurant[];
}

function Restaurants({ restaurants }: RestaurantProps) {
  return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${restaurants.map(({ info }) => Restaurant({ info })).join('')}
      </ul>
    </section>
  `;
}

export { Restaurants };
