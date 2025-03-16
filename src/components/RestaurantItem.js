import createElement from '../utils/createElement.js';
import { RESTAURANT_ITEMS } from '../../public/restaurantData.js';
import RestaurantDetailModal from './RestaurantDetailModal.js';
import { deleteRestaurantById } from './RestaurantList.js';

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

  const starImg = createElement('div', 'restaurant__star');
  const descriptionPara = createElement('p', 'restaurant__description text-body', data.description);

  return { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara };
}

function createRestaurantItem(data) {
  const restaurantItem = createElement('li', 'restaurant');
  const categoryDiv = createElement('div', 'restaurant__category');
  const infoDiv = createElement('div', 'restaurant__info');
  const titleDiv = createElement('div', 'restaurant__title');
  const flexDiv = createElement('div', 'flex');

  const { categoryImg, nameHeading, distanceSpan, starImg, descriptionPara } = createTags(data);

  if (data.favorite) {
    starImg.classList.add('favorite');
  } else {
    starImg.classList.remove('favorite');
  }

  starImg.addEventListener('click', (event) => {
    event.stopPropagation();
    starImg.classList.toggle('favorite');
    data.favorite = !data.favorite;
    updateFavoriteRestaurants();
  });

  restaurantItem.addEventListener('click', () => {
    const modal = new RestaurantDetailModal();
    modal.updateModalContent({
      data,
      onDelete: (event, id) => {
        deleteRestaurantById(id);
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
  const favoriteRestaurants = RESTAURANT_ITEMS.filter((item) => item.favorite);

  const $favoriteTabContent = document.querySelector('.favorite-tab-content');
  $favoriteTabContent.innerHTML = '';

  favoriteRestaurants.forEach((data) => {
    const restaurantItem = createRestaurantItem(data);
    $favoriteTabContent.appendChild(restaurantItem);
  });
}

export default createRestaurantItem;
