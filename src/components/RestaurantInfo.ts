import { Restaurant } from '../domain/Restaurant';
import { closeModal } from '../modal';
import { categoryImageSource } from '../utils/imageSource';

export default function RestaurantInfo(restaurant: Restaurant) {
  const $infoContainer = document.createElement('div');
  const { category, distance, name, description, link } =
    restaurant.getRestaurantInfo();

  const clickHandler = (e: Event) => {
    const target = e.target as HTMLElement;

    if (target.dataset['name'] === 'close') {
      closeModal();
    }
  };

  const template = `
    <div class="restaurant__category">
      <img src="${categoryImageSource(
        category
      )}" alt="${category}" class="category-icon">
    </div>
    <h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
    <p class="restaurant__description text-body">${description ?? ''}</p>
    ${linkTag(link)}
    <div class="button-container">
      <button data-name="delete" type="button" class="button button--secondary text-caption">삭제하기</button>
      <button data-name="close"class="button button--primary text-caption">닫기</button>
    </div>
    `;

  $infoContainer.innerHTML = template;
  $infoContainer.addEventListener('click', clickHandler);

  return $infoContainer;
}

const linkTag = ($link: string | undefined) =>
  $link === undefined || $link === ''
    ? ''
    : `<a class="restaurant__description text-body" href="${$link}>${$link}</a>`;
