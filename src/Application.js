import { Header, Restaurant, Modal, RestaurantList, RestaurantAddModal, InputBox, Button } from './components/index.js';
import Component from './core/Component.js';
import { RESTAURANT_LIST_DEFAULT } from './lib/constants.js';

export default class Application extends Component {
  constructor() {
    super();
  }

  setup() {
    this.state = {
      restaurants: RESTAURANT_LIST_DEFAULT,
    };
  }

  template() {
    return `
      ${new Header({ title: '오늘 뭐 먹지' }).template()}
      ${new RestaurantList({
        restaurants: this.state.restaurants,
      }).template()}
    `;
  }

  addRestaurant(restaurant) {
    this.setState({
      ...this.state,
      restaurants: [...this.state.restaurants, restaurant],
    });
  }

  onRender() {
    const restaurantAddModal = new RestaurantAddModal({
      addRestaurant: this.addRestaurant.bind(this),
    });
    this.element.appendChild(restaurantAddModal.element);

    window.addEventListener('click', (event) => {
      const $modal = this.element.querySelector('.modal');
      if (event.target.closest('.gnb__button')) {
        $modal.classList.add('modal--open');
      }
      if (event.target.closest('#modal-cancel') || event.target.closest('.modal-backdrop')) {
        $modal.classList.remove('modal--open');
      }
    });
    console.log(this.state);
  }
}
