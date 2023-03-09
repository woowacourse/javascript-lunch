import './restaurantItem.css';
import { Restaurant } from '../domain/Restaurant';
import { appendModal, showModal } from '../modal';
import RestaurantInfo from './RestaurantInfo';
import { categoryImageSource } from '../utils/imageSource';

export default function RestaurantItemTemplate(restaurant: Restaurant) {
  const { category, distance, name, description } =
    restaurant.getRestaurantInfo();

  const $li = document.createElement('li');
  $li.className = 'restaurant';
  $li.dataset['type'] = 'restaurantItem';

  const listClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;

    const type = target.dataset['type'];
    if (type === undefined) {
      showModal();
      appendModal(RestaurantInfo(restaurant));
      return;
    }

    if (type === 'favoriteButton') toggleFavoriteFilled(target, restaurant);
  };

  const template = `
    <button class="favorite-button" data-type="favoriteButton" > 
    </button>
    <div class="restaurant__category">
      <img src="${categoryImageSource(
        category
      )}" alt="${category}" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
      <p class="restaurant__description text-body">${description ?? ''}</p>
    </div>
    `;

  $li.innerHTML = template;

  $li.addEventListener('click', listClickHandler);
  return $li;
}

export function toggleFavoriteFilled(
  $target: HTMLElement,
  restaurant: Restaurant
) {
  restaurant.setFavoriteState(!restaurant.getFavoriteState());

  if (restaurant.getFavoriteState()) $target.classList.add('favorite-filled');
  if (!restaurant.getFavoriteState())
    $target.classList.remove('favorite-filled');
}
