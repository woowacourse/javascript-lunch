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

    const restaurant = JSON.parse(localStorage.getItem(name ?? '') ?? '{}');
    onClickRestaurantList(restaurant);
  });
};

export const getRestaurantNameFromEventTarget = (event: Event) => {
  // 음식점 li요소 클릭
  if (event.target instanceof HTMLLIElement) {
    return event.target.querySelector('.restaurant__name')?.textContent;
  }

  // 음식점 카테고리 div요소 클릭
  if (event.target instanceof HTMLDivElement) {
    return event.target.nextElementSibling?.querySelector('.restaurant__name')?.textContent;
  }

  // 음식점 카테고리 이미지 클릭
  if (event.target instanceof HTMLImageElement) {
    const name =
      event.target.parentElement?.nextElementSibling?.querySelector(
        '.restaurant__name',
      )?.textContent;
    return name;
  }

  // 음식점 이름 클릭
  if (event.target instanceof HTMLHeadingElement) {
    return event.target.textContent;
  }

  // 음식점까지의 거리 클릭
  if (event.target instanceof HTMLSpanElement) {
    return event.target.previousElementSibling?.textContent;
  }

  // 음식점 설명 클릭
  if (event.target instanceof HTMLParagraphElement) {
    return event.target.previousElementSibling?.previousElementSibling?.textContent;
  }
};

export const addFavoriteButtonClickEventHandler = (onClickFavoriteButton: CallableFunction) => {
  const restaurantList = $('.restaurant-list');

  restaurantList.addEventListener('click', (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const name = event.target.parentNode?.querySelector('.restaurant__name')?.textContent;
      const restaurant = JSON.parse(localStorage.getItem(name ?? '') ?? '{}');

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
