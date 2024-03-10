import { Restaurant as RestaurantType, CategoryType } from '../../types/index';
import {
  CategoryAsian,
  CategoryChinese,
  CategoryEtc,
  CategoryJapanese,
  CategoryKorean,
  CategoryWestern,
} from '../../asset/img/index';

import './restaurant.css';

const CATEGORY_IMAGE: Record<CategoryType, string> = {
  한식: CategoryKorean,
  중식: CategoryChinese,
  일식: CategoryJapanese,
  양식: CategoryWestern,
  아시안: CategoryAsian,
  기타: CategoryEtc,
  전체: '',
};

class Restaurant extends HTMLLIElement {
  constructor(restaurant: RestaurantType) {
    super();
    
    this.className = 'restaurant';
    this.createLayout(restaurant);
  };

  createLayout(restaurant: RestaurantType) {
    const frag = document.createDocumentFragment();
    const restaurantCategory = this.createRestaurantCategory(restaurant.category);
    const restaurantInfo = this.createRestaurantInfo(restaurant);

    frag.appendChild(restaurantCategory);
    frag.appendChild(restaurantInfo);
    this.appendChild(frag);
  }

  createRestaurantCategory(category: CategoryType) {
    const restaurantCategory = document.createElement('div');
    restaurantCategory.className = 'restaurant__category';
    
    const img = document.createElement('img');
    img.setAttribute('src', CATEGORY_IMAGE[category]);
    img.setAttribute('alt', category);
    img.className = 'category-icon';
    restaurantCategory.appendChild(img);
    return restaurantCategory;
  }

  createRestaurantInfo(restaurant: RestaurantType) {
    const { name, distance, introduction } = restaurant;
    const restaurantInfo = document.createElement('div');
    restaurantInfo.className = 'restaurant__info';

    const h3 = document.createElement('h3');
    const h3ClassList = ['restaurant__name', 'text-subtitle'];
    h3.classList.add(...h3ClassList);
    h3.textContent = name;

    const span = document.createElement('span');
    const spanClassList = ['restaurant__distance', 'text-body'];
    span.classList.add(...spanClassList);
    span.textContent = `캠퍼스부터 ${distance}분 내`;

    const p = document.createElement('p');
    const pClassList = ['restaurant__description', 'text-body'];
    p.classList.add(...pClassList);
    p.textContent = introduction ?? '';

    restaurantInfo.appendChild(h3);
    restaurantInfo.appendChild(span);
    restaurantInfo.appendChild(p);
    return restaurantInfo;
  }
}

customElements.define('restaurant-list-container', Restaurant, { extends: 'li' });

export default Restaurant;
