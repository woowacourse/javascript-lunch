import createElement from '../utils/createElement.js';
import RestaurantDetailModal from './RestaurantDetailModal.js';
import {
  createRestaurantData,
  toggleFavorite,
  getFavoriteRestaurants,
} from '../services/RestaurantItemService.ts';
import { handleDeleteRestaurant } from './RestaurantList.js';

function createTags(data) {
  const categoryImg = createElement('img', 'category-icon', null, {
    src: data.categoryImgSrc,
    alt: data.category,
  });
  const nameHeading = createElement('h3', 'restaurant__name text-subtitle', data.name);
  const distanceSpan = createElement(
    'span',
    'restaurant__distance text-body',
    `캠퍼스부터 ${data.distance}분 내`
  );

  const starImg = createElement('img', 'restaurant__star', null, {
    src: data.favorite ? './images/Star.png' : './images/Star border.png',
    alt: 'favorite star',
  });

  const descriptionPara = createElement('p', 'restaurant__description text-body', data.description);

  return { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara };
}

function createRestaurantItem(data) {
  const restaurantItem = createElement('li', 'restaurant');
  const categoryDiv = createElement('div', 'restaurant__category');
  const infoDiv = createElement('div', 'restaurant__info');
  const titleDiv = createElement('div', 'restaurant__title');
  const flexDiv = createElement('div', 'flex');

  const restaurantData = createRestaurantData(data);
  const { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara } =
    createTags(restaurantData);

  if (restaurantData.favorite) {
    starImg.classList.add('favorite');
  }

  starImg.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFavorite(restaurantData.id);
    const newSrc = starImg.src.includes('Star.png')
      ? './images/Star border.png'
      : './images/Star.png';
    starImg.src = newSrc;
    updateFavoriteRestaurants();
  });

  restaurantItem.addEventListener('click', () => {
    const modal = new RestaurantDetailModal();
    modal.updateModalContent({
      data,
      onDelete: (event, id) => {
        handleDeleteRestaurant(id);
      },
    });
    document.body.appendChild(modal.modal.getElement());
    modal.modal.toggle();
  });

  categoryDiv.append(categoryImg);
  titleDiv.append(nameHeading, distanceSpan);
  flexDiv.append(titleDiv, starImg);
  infoDiv.append(flexDiv, descriptionPara);
  restaurantItem.append(categoryDiv, infoDiv);

  return restaurantItem;
}

function updateFavoriteRestaurants() {
  const favoriteRestaurants = getFavoriteRestaurants();

  const $favoriteTabContent = document.querySelector('.favorite-tab-content');

  if (!$favoriteTabContent) {
    console.error('요소를 찾을 수 없습니다.');
    return;
  }

  $favoriteTabContent.innerHTML = '';

  favoriteRestaurants.forEach((data) => {
    const restaurantItem = createRestaurantItem(data);
    $favoriteTabContent.appendChild(restaurantItem);
  });
}

export default createRestaurantItem;
