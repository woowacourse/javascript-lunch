import '../css/Restaurant.css';

import { Restaurant } from '../../domain/model/LunchRecommendation';
import updateActiveTab from '../../utils/common/tabStyleHandler';
import { useEvents } from '../../utils/core';
import { getFavoriteIconSrc } from '../../utils/common/getImageSrc';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { RestaurantItem } from './RestaurantItem';

interface OftenProps {
  all: VoidFunction;
}

function OftenRestaurants({ all }: OftenProps) {
  const {
    values: { oftenRestaurants },
    handlers: { handleClickOftenBtn },
  } = useRestaurants();

  const [addEvent] = useEvents('main');

  addEvent('click', '.all-tab', (e) => {
    updateActiveTab('.all-tab');
    console.log('모든 음식점으로');
    all();
  });

  addEvent('click', '.favorite-icon', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.src = getFavoriteIconSrc(e.target.src);
      console.log(e.target.id);
      handleClickOftenBtn(Number(e.target.id));
    }
  });

  return `
    <section class="restaurant-list-container">
      <ul class="often-restaurant-list">
        ${oftenRestaurants && oftenRestaurants.map(({ info }) => RestaurantItem({ info })).join('')}
      </ul>
    </section>
    `;
}

export { OftenRestaurants };
