import { Category, DistanceNumeric, IRestaurant } from '@/types/Restaurant';

import style from './RestaurantItem.module.css';
import RestaurantCategoryIcon from '../Basic/RestaurantCategoryIcon/RestaurantCategoryIcon';
import FavoriteIcon from '../Basic/FavoriteIcon';

class RestaurantItemDetail extends HTMLLIElement {
  #category: Category = '기타';
  #name: string = '빈 이름';
  #distance?: DistanceNumeric;
  #description?: string;
  #link?: string;
  #isFavorite: boolean = false;

  constructor(props?: IRestaurant) {
    super();

    if (props) {
      this.setState(props);
    }

    this.render();
  }

  setState({ category, name, distance, description, link, isFavorite }: IRestaurant) {
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
      </div>
     `;

    (
      this.querySelector('div[is="restaurant-category-icon"]') as RestaurantCategoryIcon
    ).setCategory(this.#category);
    this.querySelector('.restaurant__name')!.textContent = `${this.#name}`;
    this.querySelector('.restaurant__distance')!.textContent = `캠퍼스부터 ${this.#distance}분 내`;
    this.querySelector('.restaurant__description')!.textContent = `${this.#description ?? ''}`;
  }

  get() {
    return {
      category: this.#category,
      name: this.#name,
      distance: this.#distance,
      description: this.#description,
      link: this.#link,
    };
  }
}

export default RestaurantItemDetail;

customElements.define('restaurant-item-detail', RestaurantItemDetail, { extends: 'li' });
