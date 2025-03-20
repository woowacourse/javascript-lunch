import { CATEGORY_IMAGES, ICON_IMAGES } from '../assets/images';
import useFavorite from '../hooks/useFavorite';
import { RestaurantType } from '../types/restaurants';
import { useEvents, useState } from '../utils/core/Core';
import Button from './@common/Button';
import BottomSheet from './BottomSheet';

interface RestaurantProps extends RestaurantType {}

const Restaurant = (props: RestaurantProps) => {
  const { category, name, distance, description, link, isFavorite } = props;
  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const { handleFavoriteToggle } = useFavorite();
  const [addEvent] = useEvents('.restaurant-list');

  const buttonId = `favorite-${crypto.randomUUID()}`;
  const restaurantId = `restaurant-${crypto.randomUUID()}`;

  addEvent('click', `#${restaurantId}`, () => {
    setIsBottomSheetOpen(true);
  });

  addEvent('click', `#${buttonId}`, () => {
    handleFavoriteToggle(name, isFavorite, setFavorite);
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
      isBottomSheetOpen === true
        ? BottomSheet({
            name,
            favorite,
            category,
            distance,
            description,
            link,
            onClose: () => {
              setIsBottomSheetOpen(false);
            },
            handleFavoriteToggle: () => {
              handleFavoriteToggle(name, favorite, setFavorite);
            },
            buttonId,
            setFavorite,
          })
        : ''
    }
  `;
};

export default Restaurant;
