import '../css/Restaurant.css';
import '../../assets/baemin-empty.png';

import { Restaurant as IRestaurant } from '../../domain/model/LunchRecommendation';
import { RestaurantItem } from './RestaurantItem';
import { useEvents, useState } from '../../utils/core';
import { getFavoriteIconSrc } from '../../utils/common/getImageSrc';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
interface RestaurantProps {
  restaurants: IRestaurant[];
}

function RestaurantList({ restaurants }: RestaurantProps) {
  return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${
          restaurants.length === 0
            ? `<div class="empty-list"><img src='./baemin-empty.png'><p>여기에 음식점을 추가해주세요!</p></div>`
            : ''
        }
        ${restaurants && restaurants.map(({ info }) => RestaurantItem({ info })).join('')}
      </ul>
    </section>
  `;
}

export { RestaurantList };
