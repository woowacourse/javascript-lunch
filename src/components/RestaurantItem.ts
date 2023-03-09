import './restaurantItem.css';
import { Restaurant } from '../domain/Restaurant';
import { appendModal, showModal } from '../modal';
import { categoryImageSource } from '../utils/imageSource';
import RestaurantInfo from './RestaurantInfo';
import { IMethods } from '../App';
import { store } from '../store';

export default function RestaurantItem(
  restaurant: Restaurant,
  methods: IMethods
) {
  const { category, distance, name, description, isFavorite } =
    restaurant.getRestaurantInfo();

  const $li = document.createElement('li');
  $li.className = 'restaurant';

  const listClickHandler = (e: Event) => {
    if (!(e.target instanceof HTMLElement)) return;

    const type = e.target.dataset['type'];

    if (type === undefined) {
      showModal();
      appendModal(RestaurantInfo(restaurant, methods));
      return;
    }

    if (type === 'favoriteButton') {
      toggleFavoriteFilled(e.target, restaurant);
      methods.updateLocalStorage();
      methods.renderListArticle(store.currentTab);
    }
  };

  const template = `
    <button class="favorite-button ${
      isFavorite ? 'favorite-filled' : ''
    }" data-type="favoriteButton" > 
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
