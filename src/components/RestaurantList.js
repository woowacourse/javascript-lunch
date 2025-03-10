import { Header, Restaurant, Modal, RestaurantList, RestaurantAddModal, InputBox, Button } from './index.js';
import Component from '../core/Component.js';
import { RESTAURANT_LIST_DEFAULT } from '../lib/constants.js';

export default class Application extends Component {
  constructor() {
    super();

    this.setState({ restaurants: RESTAURANT_LIST_DEFAULT });
  }

  template() {
    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.state.restaurants.map((restaurant) => new Restaurant(restaurant).template()).join('')}
        </ul>
      </section>
    `;
  }

  addRestaurant(restaurant) {
    this.setState({
      ...this.state,
      restaurants: [...this.state.restaurants, restaurant],
    });
  }

  onRender() {
    this.#appendRestaurantAddModal();
    this.#attachClickEventListener();
    this.#attachKeyDownEventListener();
  }

  #appendRestaurantAddModal() {
    const restaurantAddModal = new RestaurantAddModal({
      addRestaurant: this.addRestaurant.bind(this),
    });
    this.element.appendChild(restaurantAddModal.render());
  }

  #attachClickEventListener() {
    window.addEventListener('click', (event) => {
      const $modal = this.element.querySelector('.modal');
      if (!$modal) return;

      if (event.target.closest('.gnb__button')) $modal.classList.add('modal--open');
      if (event.target.closest('#modal-cancel') || event.target.closest('.modal-backdrop'))
        $modal.classList.remove('modal--open');
    });
  }

  #attachKeyDownEventListener() {
    window.addEventListener('keydown', (event) => {
      const $modal = this.element.querySelector('.modal');
      if (event.key === 'Escape') {
        $modal.classList.remove('modal--open');
      }
    });
  }
}
