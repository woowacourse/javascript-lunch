import IRestaurant from "../../type/IRestaurant";
import { findRestaurantById } from "../../domain/restaurant";
import { CategoryImage } from "../CategoryImage";
import styleClass from "../../constants/styleClass";
class RestaurantItem extends HTMLElement {
  restaurant: IRestaurant | undefined;

  constructor() {
    super();
    const id = this.getAttribute("id");
    if (id) {
      this.restaurant = findRestaurantById(id);
      this.restaurant && this.render(this.restaurant);
    }
  }

  render(restaurant: IRestaurant) {
    this.innerHTML = `
    <li class="restaurant">
      <div class="${styleClass.restaurant.category}">
        ${CategoryImage(restaurant.category)}
      </div>
      <div class="${styleClass.restaurant.info} w-100">
        <div class="d-flex justify-content-between">
          <div>
            <h3 class="${styleClass.restaurant.name} ${styleClass.text.subtitle}">
              ${restaurant.name}
            </h3>
            <span class="${styleClass.restaurant.distance} text-body" >
              캠퍼스부터 ${restaurant.distance}분 내
            </span>
          </div>
          <div>
            <favorite-button
              class="favorite-button-${restaurant.id}"
              restaurant-id="${restaurant.id}" 
              data-favorite="${restaurant.favorite}">
            </favorite-button>
          </div>
        </div>
        <p class="${styleClass.restaurant.description} ${styleClass.text.body} word-break">
          ${restaurant.description}
        </p>
      </div>
    </li>
  `;
  }
}
export default RestaurantItem;
