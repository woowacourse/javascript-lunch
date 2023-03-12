import './RestaurantList.css';
import { $ } from '../utils/domSelectors';
import { Restaurant } from '../types/types';
import { RestaurantItem } from './RestaurantItem';
import { FAVORITE_ICON_IMAGE, RESTAURANT_IMAGE } from '../constants/images';

export const RestaurantList = (restaurants: Restaurant[]) => {
  const restaurantItems = restaurants.map((restaurant) => {
    const categoryImageUrl = RESTAURANT_IMAGE[restaurant.category];

    return RestaurantItem(restaurant, categoryImageUrl);
  });

  return `${restaurantItems.join('')}`;
};

export const renderRestaurantList = (restaurants: Restaurant[]) => {
  const restaurantListContainer = $<HTMLUListElement>('.restaurant-list');
  const restaurantListTemplate = RestaurantList(restaurants);

  restaurantListContainer.innerHTML = '';
  restaurantListContainer.insertAdjacentHTML('beforeend', restaurantListTemplate);
};

export const addRestaurantListClickEventHandler = (onClickRestaurantList: CallableFunction) => {
  const restaurantList = $('.restaurant-list');
  const restaurantDetailModal = $<HTMLDialogElement>('#restaurant-detail-modal');

  restaurantList.addEventListener('click', (event) => {
    if (event.target instanceof HTMLButtonElement) return false;
    if (restaurantDetailModal.open) return false;

    const name = getRestaurantNameFromEventTarget(event);

    if (typeof name !== 'string') return;
    const restaurantJSON = localStorage.getItem(name);

    if (typeof restaurantJSON !== 'string') return;
    const restaurant = JSON.parse(restaurantJSON);

    onClickRestaurantList(restaurant);
  });
};

export const getRestaurantNameFromEventTarget = (event: Event) => {
  if (event.target instanceof HTMLElement) {
    return event.target.closest('.restaurant')?.querySelector('.restaurant__name')?.textContent;
  }
};

export const addFavoriteButtonClickEventHandler = (onClickFavoriteButton: CallableFunction) => {
  const restaurantList = $('.restaurant-list');

  restaurantList.addEventListener('click', (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const name = event.target.parentNode?.querySelector('.restaurant__name')?.textContent;

      if (typeof name !== 'string') return;
      const restaurantJSON = localStorage.getItem(name);

      if (typeof restaurantJSON !== 'string') return;
      const restaurant = JSON.parse(restaurantJSON);

      restaurant.favorite = !restaurant.favorite;
      restaurant.favoriteImageUrl = restaurant.favorite
        ? FAVORITE_ICON_IMAGE.FILLED
        : FAVORITE_ICON_IMAGE.LINED;

      event.target.style.backgroundImage = `url("${restaurant.favoriteImageUrl}")`;

      localStorage.setItem(restaurant.name, JSON.stringify(restaurant));

      onClickFavoriteButton();
    }
  });
};
