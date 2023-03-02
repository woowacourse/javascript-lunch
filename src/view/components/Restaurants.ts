import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { Restaurant } from './Restaurant';

function Restaurants() {
  const mockData: RestaurantInfo[] = JSON.parse(localStorage.getItem('mock') ?? '[]');

  return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${mockData.map((info) => Restaurant({ info })).join('')}
      </ul>
    </section>
  `;
}

export { Restaurants };
