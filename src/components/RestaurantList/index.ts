import { selectRestaurants } from "../../domain/restaurant";
import IRestaurant from "../../type/IRestaurant";

class RestaurantList extends HTMLElement {
  render() {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.restaurantItems(selectRestaurants())}
        </ul>
      </section>
    `;
  }

  restaurantItems(selectedRestaurants: IRestaurant[]) {
    return selectedRestaurants
      .map(
        (restaurant) =>
          `<restaurant-item id="${restaurant.id}"></restaurant-item>`
      )
      .join("");
  }
}

export default RestaurantList;
