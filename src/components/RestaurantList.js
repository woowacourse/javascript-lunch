import RestaurantRepository from '../domain/RestaurantRepository';
import Component from './Component';

class RestaurantList extends Component {
  static observedAttributes = ['category', 'sorting'];

  #restaurants;

  constructor() {
    super();
    this.setAttribute('category', '전체');
    this.setAttribute('sorting', '이름순');
    this.#generateRestaurants();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'category' || name === 'sorting') {
      this.#generateRestaurants();
    }
  }

  setEvent() {
    document.addEventListener('submitButtonClick', (event) => {
      event.preventDefault();
      this.#updateRestaurants(event.detail);
    });
  }

  #generateRestaurants() {
    const category = this.getAttribute('category');
    const sorting = this.getAttribute('sorting');
    this.#restaurants = RestaurantRepository.transformRestaurants(category, sorting);
    this.render();
  }

  #updateRestaurants(restaurant) {
    RestaurantRepository.addRestaurant(restaurant);
    this.#generateRestaurants();
  }

  template() {
    if (!this.#restaurants) {
      return '';
    }
    return `
    <section class="restaurant-list-container">
      <ol>
        ${this.#restaurants
          .map(
            (restaurant) =>
              `<restaurant-item category="${restaurant.category}" name="${restaurant.name}" distance="${restaurant.distance}" description="${restaurant.description}" reference="${restaurant.reference}"></restaurant-item>`,
          )
          .join('')}
      </ol>
    </section>
    `;
  }
}

export default RestaurantList;
