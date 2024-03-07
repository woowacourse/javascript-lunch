class RestaurantList extends HTMLElement {
  static observedAttributes = ['restaurants'];

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.template(JSON.parse(this.getAttribute('restaurants')));
  }

  template(restaurants) {
    return `
    <section class="restaurant-list-container">
      ${restaurants
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
