import './restaurantItem.css';
import korean from '../../assets/category-korean.png';
import chinese from '../../assets/category-chinese.png';
import japanese from '../../assets/category-japanese.png';
import western from '../../assets/category-western.png';
import asian from '../../assets/category-asian.png';
import etc from '../../assets/category-etc.png';
import favorite from '../../assets/favorite-icon-filled.png';
import notFavorite from '../../assets/favorite-icon-lined.png';

import { CategoryOptions } from '../types/type';
import { Restaurant } from '../domain/Restaurant';
import { showModal } from '../modal';

export default function RestaurantItemTemplate(restaurant: Restaurant) {
  const { id, category, distance, name, description } =
    restaurant.getRestaurantInfo();

  const $li = document.createElement('li');
  $li.className = 'restaurant';
  $li.dataset['type'] = 'restaurantItem';

  const listClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;

    if (!target.dataset['type']) {
      return;
    }

    restaurant.setFavoriteState(!restaurant.getFavoriteState());

    if (restaurant.getFavoriteState()) target.classList.add('favorite-filled');
    if (!restaurant.getFavoriteState())
      target.classList.remove('favorite-filled');
  };

  const template = `
    <button id=${id} class="favorite-button" data-type="favoriteButton" > 
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

function categoryImageSource(category: CategoryOptions) {
  switch (category) {
    case '한식':
      return korean;
    case '중식':
      return chinese;
    case '일식':
      return japanese;
    case '양식':
      return western;
    case '아시안':
      return asian;
    case '기타':
      return etc;
  }
}

function favoriteImageSource(isFavorite: boolean) {
  if (isFavorite) return favorite;

  return notFavorite;
}
