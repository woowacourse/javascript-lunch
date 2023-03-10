import { CATEGORY_IMG_PATH, STAR_IMG_PATH } from '../../constant';
import actions from '../../hooks/actions';
import { Restaurant } from '../../type/common';
import { $ } from '../../utils/querySelector';
import RestaurantList from './RestaurantList';

class RestaurantItem {
  #target;

  #id: number | undefined;

  constructor($target: Element) {
    this.#target = $target;
  }

  #template(restaurant: Restaurant) {
    this.#id = Number(restaurant.id);

    return `
      <li id="${restaurant.id}" class="restaurant">
        <div class="restaurant__category">
          <img src="${
            CATEGORY_IMG_PATH[restaurant.category]
          }" alt="한식" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${
            restaurant.distance
          }분 내</span>
          <p class="restaurant__description text-body">${
            restaurant.description
          }</p>
        </div>
      
        <img class="star" src="${
          restaurant.favorite ? STAR_IMG_PATH['fill'] : STAR_IMG_PATH['line']
        }" />
        
      </li>
    `;
  }

  render(restaurant: Restaurant) {
    this.#target.innerHTML += this.#template(restaurant);

    return this;
  }

  addEvent(eventTarget: Element) {
    if (this.#id === Number(eventTarget.parentElement?.id)) {
      actions.checkFavoritRestaurant(this.#id);
    }
  }

  setEvent() {
    this.#target.addEventListener('click', (e) => {
      if (e.target instanceof HTMLImageElement) {
        this.addEvent(e.target);

        new RestaurantList($('.restaurant-list-wrapper')).render();
      }
    });
  }
}

export default RestaurantItem;
