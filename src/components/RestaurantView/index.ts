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
      <div class="d-flex justify-content-between">
        <div>
          <h3 class="restaurant__name text-subtitle">
            ${this.restaurant?.name}
          </h3>
          <span class="restaurant__distance text-body" >
            캠퍼스부터 ${this.restaurant?.distance}분 내
          </span>
        </div>
        <div>
          <favorite-button
            class="favorite-button-${this.restaurant?.id}"
            restaurant-id="${this.restaurant?.id}" 
            favorite="${this.restaurant?.favorite}">
          </favorite-button>
        </div>
      </div>
      ${this.restaurant?.description}
      ${this.restaurant?.link}
    </div>
    `;
  }
}

export default RestaurantView;
