import './restaurant.css';

import { Restaurant as RestaurantType } from '../../types/index';
import Modal from '../modal/Modal';
import RestaurantDetail from '../restaurantDetail/RestaurantDetail';
import DOM from '../../utils/DOM';
import CategoryImage from '../categoryImage/CategoryImage';

const { $ } = DOM;

class Restaurant extends HTMLLIElement {
  constructor(restaurant: RestaurantType) {
    super();
    
    this.className = 'restaurant';
    this.createLayout(restaurant);
  };

  createLayout(restaurant: RestaurantType) {
    const frag = document.createDocumentFragment();
    const restaurantCategory = new CategoryImage(restaurant.category);
    const restaurantInfo = this.createRestaurantInfo(restaurant);

    frag.appendChild(restaurantCategory);
    frag.appendChild(restaurantInfo);
    this.appendChild(frag);
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

  listenClickForCreateDetailModal(restaurant: RestaurantType) {
    this.addEventListener('click', () => {
      const modal = new Modal({ title: '', child: new RestaurantDetail(restaurant)});
      $<HTMLElement>('main').appendChild(modal);
    });
  }
}

customElements.define('restaurant-list-container', Restaurant, { extends: 'li' });

export default Restaurant;
