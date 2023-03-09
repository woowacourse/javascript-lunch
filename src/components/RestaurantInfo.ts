import './restaurantInfo.css';
import { Restaurant } from '../domain/Restaurant';
import { closeModal } from '../modal';
import { categoryImageSource } from '../utils/imageSource';
import { toggleFavoriteFilled } from './RestaurantItem';
import { IMethods } from '../App';
import { store } from '../store';

export default function RestaurantInfo(
  restaurant: Restaurant,
  methods: IMethods
) {
  const $infoContainer = document.createElement('div');
  $infoContainer.className = 'info-container';
  const { id, category, distance, name, description, link, isFavorite } =
    restaurant.getRestaurantInfo();

  const clickHandler = (e: Event) => {
    if (!(e.target instanceof HTMLElement)) return;
    const type = e.target.dataset['type'];

    if (type === 'close') {
      methods.updateLocalStorage();
      methods.renderListArticle(store.currentTab);
      closeModal();
    }

    if (type === 'delete') {
      methods.deleteHandler(id);
      closeModal();
    }
    if (type === 'favoriteButton') toggleFavoriteFilled(e.target, restaurant);
  };

  const template = `
  <button class="info-favorite-button ${
    isFavorite ? 'favorite-filled' : ''
  }" data-type="favoriteButton"></button>
    <div class="restaurant__category">
      <img src="${categoryImageSource(
        category
      )}" alt="${category}" class="category-icon">
    </div>
    <h3 class="detail__name text-subtitle">${name}</h3>
    <span class="detail__distance text-body">캠퍼스부터 ${distance}분 내</span>
    ${descripttionTag(description)}
    ${linkTag(link)}

    <div class="button-container">
      <button data-type="delete" type="button" class="button button--secondary text-caption">삭제하기</button>
      <button data-type="close"class="button button--primary text-caption">닫기</button>
    </div>
    `;

  $infoContainer.innerHTML = template;
  $infoContainer.addEventListener('click', clickHandler);

  return $infoContainer;
}

const linkTag = (link: string | undefined) =>
  link === undefined || link === ''
    ? ''
    : `<a class="restaurant__description text-body" href="${link}">${link}</a>`;

const descripttionTag = (description: string | undefined) =>
  description === undefined || description === ''
    ? ''
    : `<p class="detail__description text-body">${description}</p>`;
