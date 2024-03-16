import './restaurant.css';

import { Restaurant as RestaurantType } from '../../types/index';
import Modal from '../modal/Modal';
import RestaurantDetail from '../restaurantDetail/RestaurantDetail';
import CategoryImage from '../categoryImage/CategoryImage';

class Restaurant extends HTMLLIElement {
  private modal: Modal;
  private content: RestaurantDetail;

  constructor(restaurant: RestaurantType) {
    super();
    
    this.id = `restaurant-list${restaurant.id}`;
    this.className = 'restaurant';
    this.createLayout(restaurant);
    const { modal, content } = this.createDetailModal(restaurant);
    this.modal = modal;
    this.content = content;
    this.listenOpenDetailModal();
    this.listenCancelButtonClick();
    this.listenDeleteButtonClick();
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

  createDetailModal(restaurant: RestaurantType) { 
    const restaurantDetail = new RestaurantDetail(restaurant);
    const modal = new Modal({ classname: 'detail-modal', child: restaurantDetail});
    
    this.appendChild(modal);
    return { modal, content: restaurantDetail };
  }

  listenOpenDetailModal() {
    this.addEventListener('click', () => {
      this.modal.stopEventBubbling();
      this.toggleModal();
    });
  }

  toggleModal() {
    this.modal.toggleModal('detail-modal');
  }

  listenCancelButtonClick() {    
    this.content.listenCloseButtonClick();
  }

  listenDeleteButtonClick() {
    this.content.listenDeleteButonClick(this.toggleModal.bind(this));
  }
}

customElements.define('restaurant-list-container', Restaurant, { extends: 'li' });

export default Restaurant;
