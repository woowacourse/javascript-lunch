import { Category, IRestaurant } from '@/types/Restaurant';

import style from './RestaurantItem.module.css';

class RestaurantItem extends HTMLLIElement {
  #category;
  #distance;
  #description;
  #name;

  constructor({ category, name, distance, description }: IRestaurant) {
    super();
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;

    this.render();
  }

  render() {
    this.className = `restaurant ${style.restaurant}`;
    this.innerHTML = `
    <div is="restaurant-category-icon" category=${this.#category}> </div>
    <div class="restaurant__info ${style.restaurant__info}">
    <h3 class="restaurant__name text-subtitle ${style.restaurant__name}">${this.#name}</h3>
    <span class="restaurant__distance text-body  ${style.restaurant__distance}">캠퍼스부터 ${
      this.#distance
    }분 내</span>
    <p class="restaurant__description text-body ${style.restaurant__description}">
    ${this.#description ?? ''}
    </p>
    <img is="favorite-icon" style="width:25px; position:absolute; right:10px; top:10px;" />
    </div>
   `;
  }
}

export default RestaurantItem;

customElements.define('restaurant-item', RestaurantItem, { extends: 'li' });
