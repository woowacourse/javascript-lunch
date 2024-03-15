import { Category, IRestaurant } from '@/types/Restaurant';

import style from './RestaurantItem.module.css';
import RestaurantCategoryIcon from '../Basic/RestaurantCategoryIcon/RestaurantCategoryIcon';
import FavoriteIcon from '../Basic/FavoriteIcon';
import MainApp from '../MainApp';

class RestaurantItem extends HTMLLIElement {
  #category;
  #distance;
  #description;
  #name;
  #link;
  #isFavorite;
  #favoriteIcon?: FavoriteIcon;
  constructor({ category, name, distance, description, link, isFavorite }: IRestaurant) {
    super();
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description ?? '';
    this.#link = link ?? '';
    this.#isFavorite = isFavorite ?? false;

    this.render();
  }

  render() {
    this.classList.add(`restaurant`, `${style.restaurant}`);
    this.innerHTML = `
    <div is="restaurant-category-icon"> </div>
    <div class="restaurant__info ${style.restaurant__info}">
    <h3 class="restaurant__name text-subtitle ${style.restaurant__name}"></h3>
    <span class="restaurant__distance text-body  ${style.restaurant__distance}"></span>
    <p class="restaurant__description text-body ${style.restaurant__description}">
    </p>
    <img is="favorite-icon" class="favorite-icon" style="width:26px; position:absolute; right:10px; top:10px;"/>
    </div>
   `;

    (
      this.querySelector('div[is="restaurant-category-icon"]') as RestaurantCategoryIcon
    ).setCategory(this.#category);
    this.querySelector('.restaurant__name')!.textContent = `${this.#name}`;
    this.querySelector('.restaurant__distance')!.textContent = `캠퍼스부터 ${this.#distance}분 내`;
    this.querySelector('.restaurant__description')!.textContent = `${this.#description ?? ''}`;
    this.#favoriteIcon = this.querySelector('img[is="favorite-icon"]') as FavoriteIcon;
    this.#favoriteIcon.set(this.#isFavorite);
  }

  get() {
    return {
      category: this.#category,
      name: this.#name,
      distance: this.#distance,
      description: this.#description,
      link: this.#link,
      isFavorite: this.#favoriteIcon?.isFavorite(),
    };
  }
}

export default RestaurantItem;

customElements.define('restaurant-item', RestaurantItem, { extends: 'li' });
