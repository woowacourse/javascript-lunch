import { CATEGORY_IMAGES, ICON_IMAGES } from '../assets/images';
import useModal from '../hooks/useModal';
import { RestaurantType } from '../types/restaurants';
import { $ } from '../utils/@common/domHelper';
import EventManager from '../utils/@common/EventManager';
import { getStorage, saveStorage } from '../utils/@common/localStorage';
import { useState } from '../utils/core/Core';
import Button from './@common/Button';
import BottomSheet from './BottomSheet';

interface RestaurantProps extends Omit<RestaurantType, 'isFavorite'> {}

const Restaurant = (props: RestaurantProps) => {
  const { category, name, distance, description, link } = props;

  const [favorite, setFavorite] = useState(false);

  const [isModalOpen, openModal, closeModal] = useModal(false);
  const eventManager = new EventManager($('#app'));
  const buttonId = `favorite-${crypto.randomUUID()}`;
  const restaurantId = `restaurant-${crypto.randomUUID()}`;

  eventManager.addEvent('click', `#${restaurantId}`, () => {
    openModal();
  });

  const handleFavoriteToggle = () => {
    setFavorite(!favorite);

    const storedRestaurants = getStorage() || [];

    const updatedRestaurants = storedRestaurants.map(
      (restaurant: RestaurantType) =>
        restaurant.name === name
          ? { ...restaurant, isFavorite: !favorite }
          : restaurant
    );

    saveStorage(updatedRestaurants);
  };

  eventManager.addEvent('click', `#${buttonId}`, () => {
    handleFavoriteToggle();
  });

  return `
    <li class="restaurant">
      <div id="${restaurantId}" class="restaurant__container">
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
    ${
      isModalOpen
        ? BottomSheet({
            favorite,
            category,
            name,
            distance,
            description,
            link,
            onClose: () => {
              closeModal();
            },
            handleFavoriteToggle,
            buttonId,
          })
        : ''
    }
  `;
};

export default Restaurant;
