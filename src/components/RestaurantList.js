import Component from './Component';

class RestaurantList extends Component {
  static observedAttributes = ['restaurants'];

  #restaurants;

  constructor() {
    super();
    this.#restaurants = JSON.parse(this.getAttribute('restaurants'));
  }

  attributeChangedCallback() {
    this.#restaurants = JSON.parse(this.getAttribute('restaurants'));
    this.render();
  }

  template() {
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
