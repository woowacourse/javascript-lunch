import { findRestaurantById } from "../../domain/restaurant";
import findImage from "../../tools/findImage";
import IRestaurant from "../../type/IRestaurant";
import { CategoryImage } from "../CategoryImage";

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
    <div>
      <div class="restaurant__category">
        <img
        ${CategoryImage(this.restaurant?.category as string)}
      </div>
      ${this.restaurant?.name}
      <div>
        <favorite-button
          class="favorite-button-${this.restaurant?.id}"
          restaurant-id="${this.restaurant?.id}" 
          favorite="${this.restaurant?.favorite}">
        </favorite-button>
      </div>
      ${this.restaurant?.distance}
      ${this.restaurant?.description}
      ${this.restaurant?.link}
    </div>
    `;
  }
}

export default RestaurantView;
