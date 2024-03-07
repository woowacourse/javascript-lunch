class RestaurantList extends HTMLElement {
  static observedAttributes = ['restaurants'];

  constructor() {
    super();
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

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.innerHTML = this.template(JSON.parse(this.getAttribute('restaurants')));
  }

  setEvent() {}

  removeEvent() {}

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
