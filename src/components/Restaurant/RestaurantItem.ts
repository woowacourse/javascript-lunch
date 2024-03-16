import { CATEGORY_CONVERTER } from '../../constant/constants';
import { Restaurant } from '../../interface/RestaurantInterfaces';

interface Props {
  restaurant: Restaurant;
  onClick?: () => void;
}

const createRestaurantItem = ({ restaurant, onClick }: Props) => {
  const render = () => {
    const itemContainer = document.createElement('li');
    itemContainer.classList.add('restaurant');

    itemContainer.innerHTML = /* html */ `
      <div class="restaurant__favorite">
        ${
          restaurant.isFavorite
            ? `<img src="favorite-icon-filled.png" alt="즐겨찾기된 식당" id="star"/>`
            : `<img src="favorite-icon-lined.png" alt="즐겨찾기되지 않은 식당" id="unstar"/>`
        }
      </div>
      <div class="restaurant__category">
        <img src="./category-${CATEGORY_CONVERTER[restaurant.category]}.png" alt=${restaurant.category} class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
        ${
          restaurant.description
            ? `<p class="restaurant__description text-body">
          ${restaurant.description}
        </p>`
            : ''
        }
      </div>
    `;

    if (onClick) {
      itemContainer.addEventListener('click', onClick);
    }

    return itemContainer;
  };

  return render();
};

export default createRestaurantItem;
