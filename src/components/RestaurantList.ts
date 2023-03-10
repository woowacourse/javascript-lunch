import './RestaurantList.css';
import { $ } from '../utils/domSelectors';
import { Restaurant } from '../types/types';
import { RestaurantItem } from './RestaurantItem';
import { FAVORITE_ICON_IMAGE, RESTAURANT_IMAGE } from '../constants/images';

export const RestaurantList = (sortedRestaurants: Restaurant[]) => {
  const restaurantItems = sortedRestaurants.map((restaurant) => {
    const categoryImageUrl = RESTAURANT_IMAGE[restaurant.category];

    return RestaurantItem(restaurant, categoryImageUrl);
  });

  return `${restaurantItems.join('')}`;
};

export const renderRestaurantList = (restaurantList: Restaurant[]) => {
  const restaurantListContainer = $<HTMLUListElement>('.restaurant-list');
  const restaurantListTemplate = RestaurantList(restaurantList);

  restaurantListContainer.innerHTML = '';
  restaurantListContainer.insertAdjacentHTML('beforeend', restaurantListTemplate);
};

export const addRestaurantListClickEventHandler = (onClickRestaurantList: CallableFunction) => {
  const restaurantList = $('.restaurant-list');
  const restaurantDetailModal = $<HTMLDialogElement>('#restaurant-detail-modal');

  restaurantList.addEventListener('click', (event) => {
    if (event.target instanceof HTMLButtonElement) return false;
    if (restaurantDetailModal.open) return false;
    let name;

    // 음식점 li요소 클릭
    if (event.target instanceof HTMLLIElement) {
      name = event.target.querySelector('.restaurant__name')?.textContent;
      console.log('음식점 <li>요소 클릭 시 name: ', name);
    }

    // 음식점 카테고리 클릭
    if (event.target instanceof HTMLImageElement) {
      name =
        event.target.parentElement?.nextElementSibling?.querySelector(
          '.restaurant__name',
        )?.textContent;
      console.log('음식점 카테고리 이미지 클릭 시 name: ', name);
    }

    // 음식점 이름 클릭
    if (event.target instanceof HTMLHeadingElement) {
      name = event.target.textContent;
      console.log('음식점 이름 클릭 시 name: ', name);
    }

    // 음식점까지의 거리 클릭
    if (event.target instanceof HTMLSpanElement) {
      name = event.target.previousElementSibling?.textContent;
      console.log('음식점까지의 거리 클릭 시 name: ', name);
    }

    // 음식점 설명 클릭
    if (event.target instanceof HTMLParagraphElement) {
      name = event.target.previousElementSibling?.previousElementSibling?.textContent;
      console.log('음식점까지의 설명 클릭 시 name: ', name);
    }

    const restaurant = JSON.parse(localStorage.getItem(name ?? '') ?? '{}');
    onClickRestaurantList(restaurant);
  });
};

export const addFavoriteButtonClickEventHandler = (onClickFavoriteButton: CallableFunction) => {
  const restaurantList = $('.restaurant-list');

  restaurantList.addEventListener('click', (event) => {
    if (event.target instanceof HTMLButtonElement) {
      const currentImage = event.target.style.backgroundImage;
      const toggledImageUrl = toggleButtonBackgroundImageUrl(currentImage);

      event.target.style.backgroundImage = `url("${toggledImageUrl}")`;

      const name = event.target.parentNode?.querySelector('.restaurant__name')?.textContent;
      const restaurant = JSON.parse(localStorage.getItem(name ?? '') ?? '{}');

      restaurant.favoriteImageUrl = toggledImageUrl;
      localStorage.setItem(restaurant.name, JSON.stringify(restaurant));

      onClickFavoriteButton();
    }
  });
};

export const toggleButtonBackgroundImageUrl = (currentImage: string) => {
  const linedImage = `url("${FAVORITE_ICON_IMAGE.LINED}")`;

  if (currentImage === linedImage) return FAVORITE_ICON_IMAGE.FILLED;
  return FAVORITE_ICON_IMAGE.LINED;
};
