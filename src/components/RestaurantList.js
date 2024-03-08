import Component from './Component';

class RestaurantList extends Component {
  static observedAttributes = ['restaurants'];

  #restaurants;

  constructor() {
    super();
    this.#restaurants = JSON.parse(this.getAttribute('restaurants'));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#restaurants = JSON.parse(this.getAttribute('restaurants'));
    this.render();
  }

  template() {
    return `
    <section class="restaurant-list-container">
      ${this.#restaurants
        .map(
          (restaurant) =>
            `<restaurant-info category="${restaurant.category}" name="${restaurant.name}" distance="${restaurant.distance}" description="${restaurant.description}" reference="${restaurant.reference}"></restaurant-info>`,
        )
        .join('')}
      </section>
    `;
  }
}

export default RestaurantList;
