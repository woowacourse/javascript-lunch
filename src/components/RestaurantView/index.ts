import { findRestaurantById } from "../../domain/restaurant";
import IRestaurant from "../../type/IRestaurant";

class RestaurantView extends HTMLElement {
  restaurant: IRestaurant | undefined;

  constructor() {
    super();
    const restaurantId = this.getAttribute("restaurant-id");
    this.restaurant = findRestaurantById(restaurantId as string);
    this.render();
  }
  render() {
    this.innerHTML = `
    ${this.restaurant?.category}
    ${this.restaurant?.name}
    ${this.restaurant?.favorite}
    ${this.restaurant?.distance}
    ${this.restaurant?.description}
    ${this.restaurant?.link}
    `;
  }
}

export default RestaurantView;
