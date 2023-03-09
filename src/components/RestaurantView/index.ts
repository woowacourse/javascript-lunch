class RestaurantView extends HTMLElement {
  restaurantID: string | null;
  constructor() {
    super();
    this.restaurantID = this.getAttribute("restaurant-id");
    this.render();
  }
  render() {
    this.innerHTML = `
      id : r${this.restaurantID}
    `;
  }
}

export default RestaurantView;
