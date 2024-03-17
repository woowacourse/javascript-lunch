import './style.css';

import { KOREAN, CHINESE, JAPANESE, ASIAN, WESTERN, ETC } from '../../imgs/index';
import { Restaurant } from '../../types/index';
import LunchRestaurantTypeIcon from '../LunchRestaurantTypeIcon/LunchRestaurantTypeIcon';
import LunchFavoriteIcon from '../LunchFavoriteIcon/LunchFavoriteIcon';

export const CATEGORY_IMG: Record<string, string> = {
  한식: KOREAN,
  중식: CHINESE,
  일식: JAPANESE,
  아시안: ASIAN,
  양식: WESTERN,
  기타: ETC,
} as const;

class LunchItem extends HTMLLIElement {
  constructor(restaurant: Restaurant) {
    super();
    this.className = 'restaurant';
    this.createTypeIcon(restaurant);
    this.setEventListener(restaurant);
  }

  setEventListener(restaurant: Restaurant) {
    this.addEventListener('click', () => {
      const toggleItemDetailModal = new CustomEvent('toggleItemDetailModal', {
        detail: { info: restaurant },
        bubbles: true,
      });
      this.dispatchEvent(toggleItemDetailModal);
    });
  }

  createTypeIcon(restaurant: Restaurant) {
    this.appendChild(
      new LunchRestaurantTypeIcon({
        imgSrc: CATEGORY_IMG[restaurant.category],
        alt: restaurant.category,
      }),
    );
    this.appendChild(this.createRestaurantInfo(restaurant));
  }

  createRestaurantInfo(restaurant: Restaurant) {
    const container = document.createElement('div');
    container.setAttribute('class', 'restaurant__info');
    this.createInfoElements(restaurant).forEach((element) => {
      container.appendChild(element);
    });

    return container;
  }

  createInfoElements(restaurant: Restaurant) {
    return [this.createInfoHeader(restaurant), this.createInfoP(restaurant)];
  }

  createInfoHeader(restaurant: Restaurant) {
    const header = document.createElement('div');
    header.appendChild(this.createInfoTitles(restaurant));
    header.classList.add('restaurant__info-header');
    header.insertAdjacentElement('beforeend', this.createFavoriteIcon(restaurant));
    return header;
  }

  createFavoriteIcon(restaurant: Restaurant) {
    return new LunchFavoriteIcon(restaurant);
  }

  createInfoTitles(restaurant: Restaurant) {
    const container = document.createElement('div');
    container.appendChild(this.createInfoH3(restaurant));
    container.appendChild(this.createInfoSpan(restaurant));
    container.classList.add('restaurant__info-titles');

    return container;
  }

  createInfoH3(restaurant: Restaurant) {
    const h3 = document.createElement('h3');
    h3.classList.add('restaurant__name', 'text-subtitle');
    h3.textContent = restaurant.name;

    return h3;
  }

  createInfoSpan(restaurant: Restaurant) {
    const span = document.createElement('span');
    span.classList.add('restaurant__distance', 'text-body');
    span.textContent = `캠퍼스로부터 ${restaurant.distance}분 내`;

    return span;
  }

  createInfoP(restaurant: Restaurant) {
    const p = document.createElement('p');
    p.classList.add('restaurant__description', 'text-body');
    if (restaurant.description) {
      p.textContent = restaurant.description;
    }

    return p;
  }
}

customElements.define('lunch-item', LunchItem, { extends: 'li' });

export default LunchItem;
