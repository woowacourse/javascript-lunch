import '../css/Restaurant.css';

import { Restaurant as IRestaurant, RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { RestaurantItem } from './RestaurantItem';
import { useEvents } from '../../utils/core';
import { getFavoriteIconSrc } from '../../utils/common/getImageSrc';
import { useRestaurants } from '../../utils/hooks/useRestaurants';

interface RestaurantProps {
  restaurants: IRestaurant[];
}

function RestaurantList({ restaurants }: RestaurantProps) {
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
        ${restaurants && restaurants.map(({ info }) => RestaurantItem({ info })).join('')}
      </ul>
    </section>
  `;
}

export { RestaurantList };
