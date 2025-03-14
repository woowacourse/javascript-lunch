import { CATEGORY_IMAGES, ICON_IMAGES } from '../assets/images';
import { RestaurantType } from '../types/restaurants';
import { $ } from '../utils/@common/domHelper';
import EventManager from '../utils/@common/EventManager';
import { getStorage, saveStorage } from '../utils/@common/localStorage';
import Button from './@common/Button';

interface BottomSheetProps extends Omit<RestaurantType, 'isFavorite'> {
  favorite: boolean;
  onClose: () => void;
  handleFavoriteToggle: () => void;
  buttonId: string;
}

const BottomSheet = (props: BottomSheetProps) => {
  const {
    category,
    name,
    distance,
    description,
    link,
    favorite,
    onClose,
    handleFavoriteToggle,
    buttonId,
  } = props;
  const eventManager = new EventManager($('#app'));

  eventManager.addEvent('click', '.modal-backdrop', () => {
    onClose();
  });

  eventManager.addEvent(
    'click',
    '#bottom-sheet-restaurant-delete-button',
    () => {
      const storedRestaurants = getStorage() || [];

      const updatedRestaurants = storedRestaurants.filter(
        (restaurant: RestaurantType) => restaurant.name !== name
      );

      saveStorage(updatedRestaurants);

      onClose();
    }
  );

  eventManager.addEvent(
    'click',
    '#bottom-sheet-restaurant-close-button',
    () => {
      onClose();
    }
  );

  eventManager.addEvent('click', `#${buttonId}`, () => {
    handleFavoriteToggle();
  });

  return `
    <div class="modal modal--open">
      <div class="modal-backdrop"></div>  
      <div class="modal-container">
        <div class="bottom-sheet-layout">
          <div class="bottom-sheet-restaurant-container">
            <div class="restaurant__category">
              <img
                src="${CATEGORY_IMAGES[category]}"
                alt="한식"
                class="bottom-sheet-restaurant-category-icon"
              />
            </div>
            <div class="bottom-sheet-restaurant-info">
              <h3 class="restaurant__name">${name}</h3>
              <span class="restaurant__distance">캠퍼스부터 ${distance}분 내</span>
            </div>
          </div>
          <div class="bottom-sheet-restaurant-favorite-button-container">
            ${Button({
              attribute: {
                id: buttonId,
                class: 'restaurant__favorite-button',
              },
              children: `<img src="${
                favorite ? ICON_IMAGES.FAVORITE : ICON_IMAGES.UNFAVORITE
              }" alt="favorite" />`,
            })}
          </div>
        </div>
        <div class="bottom-sheet-restaurant-description">
          <p class="bottom-sheet-restaurant__description">
            ${description}
          </p>
        </div>
        <div class="bottom-sheet-restaurant-link-container">
          <a href="${link}" class="bottom-sheet-restaurant__link">
            ${link}
          </a>
        </div>
        <div class="bottom-sheet-restaurant-button-container">
          ${Button({
            attribute: {
              type: 'button',
              id: 'bottom-sheet-restaurant-delete-button',
              class: 'button button--secondary text-caption',
            },
            children: '삭제하기',
          })}
          ${Button({
            attribute: {
              type: 'button',
              id: 'bottom-sheet-restaurant-close-button',
              class: 'button button--primary text-caption',
            },
            children: '닫기',
          })}
        </div>
      </div>
    </div>
  `;
};

export default BottomSheet;
