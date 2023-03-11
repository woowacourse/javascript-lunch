import {
  lunchRecommendation,
  Restaurant,
  RestaurantInfo,
} from '../../domain/model/LunchRecommendation';
import { $, getClosest } from '../../utils/common/domHelper';
import { useEvents } from '../../utils/core';
import { Restaurant as RestaurantItem } from './Restaurant';

interface RestaurantProps {
  restaurants: Restaurant[];
  handleFavoriteBtn(id: RestaurantInfo['id']): void;
  onClick(restaurant: Restaurant): void;
}

function Restaurants({ restaurants, handleFavoriteBtn, onClick }: RestaurantProps) {
  const [addEvent] = useEvents('.restaurant-list-container');

  addEvent('click', '.restaurant', (e) => {
    const restaurantId = getClosest(e.target, '.restaurant')?.dataset.id;

    if (!restaurantId) return;

    e.target === $('.favorite-icon', $('.restaurant'))
      ? handleFavoriteBtn(Number(restaurantId))
      : onClick(lunchRecommendation.getRestaurant(Number(restaurantId)));
  });
  return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${restaurants
          .map(({ info }) =>
            RestaurantItem({
              info,
              attribute: {
                class: 'restaurant',
                'data-id': String(info.id),
              },
            })
          )
          .join('')}
      </ul>
    </section>
  `;
}

export { Restaurants };
