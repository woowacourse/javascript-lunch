import '../css/Restaurant.css';

import { getCategoryImageSrc, getFavoriteIconSrc } from '../../utils/common/getImageSrc';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { useEvents } from '../../utils/core';
import { $, $$ } from '../../utils/common/domHelper';

interface RestaurantProps {
  info: RestaurantInfo;
}

function Restaurant(props: RestaurantProps) {
  const {
    info: { id, category, name, isOften, distance, description },
  } = props;

  const iconStyle = isOften === false ? 'lined' : 'filled';

  return `
        <li class="restaurant">
            <div class="restaurant__category">
                <img src=${getCategoryImageSrc(category)} alt=${category} class="category-icon">
            </div>
            <div class="restaurant__info">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <div class="restaurant__often">
                  <img src='./favorite-icon-${iconStyle}.png' class="favorite-icon" id=${id}>
                </div>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description text-body">${description}</p>
            </div>
        </li>
    `;
}

export { Restaurant };
