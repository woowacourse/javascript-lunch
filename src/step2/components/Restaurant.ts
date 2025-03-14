import { CATEGORY_IMAGES, ICON_IMAGES } from '../assets/images';
import { RestaurantType } from '../types/restaurants';
import { $ } from '../utils/@common/domHelper';
import EventManager from '../utils/@common/EventManager';
import { useState } from '../utils/core/Core';
import Button from './@common/Button';

interface RestaurantProps extends RestaurantType {}

const Restaurant = (props: RestaurantProps) => {
  const { category, name, distance, description, isFavorite } = props;
  const [favorite, setFavorite] = useState(isFavorite);
  const eventManager = new EventManager($('#app'));

  const buttonId = `favorite-${name.replace(/\s+/g, '-')}`;

  eventManager.addEvent('click', `#${buttonId}`, () => {
    setFavorite(!favorite);
  });

  return `
    <li class="restaurant">
      <div class="restaurant__container">
      <div class="restaurant__category">
        <img
          src="${CATEGORY_IMAGES[category]}"
          alt="${category}"
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <div class="restaurant__favorite-container">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          
        </div>
        <span class="restaurant__distance text-body">
          캠퍼스부터 ${distance}분 내
        </span>
        <p class="restaurant__description text-body">
          ${description}
        </p>
      </div>
      </div>
      ${Button({
        attribute: {
          id: buttonId,
          class: 'restaurant__favorite-button',
        },
        children: `<img src="${
          favorite ? ICON_IMAGES.FAVORITE : ICON_IMAGES.UNFAVORITE
        }" alt="favorite" />`,
      })}
    </li>
  `;
};

export default Restaurant;
