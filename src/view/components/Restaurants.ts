import { Restaurant, RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { getClosest } from '../../utils/common/domHelper';
import { useEvents } from '../../utils/core';
import { Restaurant as RestaurantItem } from './Restaurant';

interface RestaurantProps {
  restaurants: Restaurant[];
  handleFavoriteBtn(id: RestaurantInfo['id']): void;
}

function Restaurants({ restaurants, handleFavoriteBtn }: RestaurantProps) {
  const [addEvent] = useEvents('.restaurant-list-container');

  addEvent('click', '.favorite-icon', (e) => {
    const restaurantId = getClosest(e.target, '.restaurant')?.dataset.id;

    if (restaurantId) handleFavoriteBtn(Number(restaurantId));
  });

  return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${restaurants.map(({ info }) => RestaurantItem({ info })).join('')}
      </ul>
    </section>
  `;
}

export { Restaurants };
