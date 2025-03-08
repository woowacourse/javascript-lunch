import {
  Header,
  Restaurant,
  Modal,
  RestaurantList,
  RestaurantAddModal,
  InputBox,
  Button,
  RestaurantTab,
} from './components/index.js';
import Component from './core/Component.js';
import { RESTAURANT_LIST_DEFAULT } from './lib/constants.js';

export default class Application extends Component {
  constructor() {
    super();

    this.setState({ restaurants: JSON.parse(localStorage.getItem('restaurants')) ?? [] });
    // this.setState({ restaurants: RESTAURANT_LIST_DEFAULT });
  }

  template() {
    return `
      ${new Header({ title: '오늘 뭐 먹지' }).template()}
    `;
  }

  componentDidMount() {
    this.#attachClickEventListener();
    this.#attachKeyDownEventListener();
  }

  onRender() {
    this.#appendRestaurantAddModal();
    this.#appendRestaurantList();
  }

  #appendRestaurantAddModal() {
    const restaurantAddModal = new RestaurantAddModal({
      addRestaurant: this.#addRestaurant.bind(this),
    });
    this.element.appendChild(restaurantAddModal.render());
  }

  #appendRestaurantList() {
    this.element.appendChild(
      new RestaurantList({
        restaurants: this.state.restaurants,
      }).render(),
    );
  }

  #addRestaurant(restaurant) {
    this.setState({
      ...this.state,
      restaurants: [...this.state.restaurants, restaurant],
    });

    localStorage.setItem('restaurants', JSON.stringify(this.state.restaurants));
  }

  #toggleLike(name) {
    const copied = [...this.state.restaurants];

    const currentRestaurantIndex = this.state.restaurants.findIndex((restaurant) => restaurant.name === name);
    const changedRestaurant = this.state.restaurants[currentRestaurantIndex];

    copied.splice(currentRestaurantIndex, 1, { ...changedRestaurant, isLike: !changedRestaurant.isLike });

    this.setState({
      ...this.state,
      restaurants: copied,
    });

    localStorage.setItem('restaurants', JSON.stringify(this.state.restaurants));
  }

  #attachClickEventListener() {
    window.addEventListener('click', (event) => {
      const $modal = this.element.querySelector('.modal');
      if (event.target.closest('.gnb__button')) $modal.classList.add('modal--open');
      if (event.target.closest('#modal-cancel') || event.target.closest('.modal-backdrop'))
        $modal.classList.remove('modal--open');

      if (event.target.closest('#like__button')) this.#toggleLike(event.target.dataset.name);
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
