import '../css/Restaurant.css';

import { Restaurant as IRestaurant, RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { Restaurant } from './Restaurant';
import { useEvents } from '../../utils/core';
import { getFavoriteIconSrc } from '../../utils/common/getImageSrc';
import { useRestaurants } from '../../utils/hooks/useRestaurants';

interface RestaurantProps {
  restaurants: IRestaurant[];
}

function Restaurants({ restaurants }: RestaurantProps) {
  const {
    handlers: { handleClickOftenBtn },
  } = useRestaurants();

  const [addEvent] = useEvents('.restaurant-list');

  addEvent('click', '.favorite-icon', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.src = getFavoriteIconSrc(e.target.src);
      console.log(e.target.id);
      handleClickOftenBtn(Number(e.target.id));
    }
  });

  return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${restaurants && restaurants.map(({ info }) => Restaurant({ info })).join('')}
      </ul>
    </section>
  `;
}

export { Restaurants };
