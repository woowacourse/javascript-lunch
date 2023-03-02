class RestaurantList {
  restaurantTemplates: string[];

  constructor(restaurantTemplates: string[]) {
    this.restaurantTemplates = restaurantTemplates;
  }

  template() {
    return `<section class="restaurant-list-container">
      <ul class="restaurant-list">
       ${this.restaurantTemplates.join("")}
      </ul>
    </section>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }
}

export default RestaurantList;
