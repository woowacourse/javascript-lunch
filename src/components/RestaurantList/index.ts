import { selectRestaurants } from "../../domain/restaurant";
import IRestaurant from "../../type/IRestaurant";
import { onClickRestaurantList } from "./handleRestaurantList";

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    onClickRestaurantList();
  }

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
    return selectedRestaurants.length > 0
      ? (
        selectedRestaurants.map((restaurant) =>
          `<restaurant-item id="${restaurant.id}"></restaurant-item>`
        ).join("")
      )
      : (
        '<div class="center super-big-font"><div><h1>텅</h1></div><div>'
      )
  }
}

export default RestaurantList;
