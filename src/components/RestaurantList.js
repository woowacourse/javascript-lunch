import Restaurants from '../domain/Restaurants';

class RestaurantList extends HTMLElement {
  #restaurants;

  constructor() {
    super();
    this.#restaurants = new Restaurants();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    const restaurants = this.#restaurants.getRestaurants();
    this.innerHTML = this.template(restaurants);
  }

  setEvent() {
    this.generateRestaurantsBySelection();
  }

  removeEvent() {}

  generateRestaurantsBySelection() {
    console.log(this.querySelector('.category'));
  }

  template(restaurants) {
    return `
    <section class="restaurant-filter-container">
      <filter-box class="category" option="category"></filter-box>
      <filter-box option="sorting"></filter-box>
    </section>
    <section class="restaurant-list-container">
      ${restaurants
        .map(
          (restaurant) =>
            `<restaurant-info category=${JSON.stringify(restaurant.category)} name=${JSON.stringify(
              restaurant.name,
            )} distance=${restaurant.distance} description=${JSON.stringify(
              restaurant.description,
            )} reference=${JSON.stringify(restaurant.reference)}></restaurant-info>`,
        )
        .join('')}
      </section>
    `;
  }
}

export default RestaurantList;
