import Component from './Component';
import RestaurantRepository from '../domain/RestaurantRepository';

class RestaurantList extends Component {
  static observedAttributes = ['category', 'sorting'];

  #restaurants;

  constructor() {
    super();
    this.#restaurants = this.#generateRestaurants();
  }

  attributeChangedCallback() {
    this.#restaurants = this.#generateRestaurants();
    this.render();
  }

  #generateRestaurants() {
    const category = this.getAttribute('category') || '전체';
    const sorting = this.getAttribute('sorting') || '이름순';

    return RestaurantRepository.transformRestaurants(category, sorting);
  }

  template() {
    return `
    <section class="restaurant-list-container">
      ${this.#restaurants
        .map(
          (restaurant) =>
            `<restaurant-item category="${restaurant.category}" name="${restaurant.name}" distance="${restaurant.distance}" description="${restaurant.description}" reference="${restaurant.reference}"></restaurant-item>`,
        )
        .join('')}
      </section>
    `;
  }
}

export default RestaurantList;
