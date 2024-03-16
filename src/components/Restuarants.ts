import Component from "../common/Component";
import { RestaurantType } from "../types";
import { CATEGORY_IMAGE_MAPPER, DISTANCE_MAPPER } from "../constants";

export default class Restaurants extends Component {
  render() {
    const { restaurants } = this.props;
    return /*html*/ `    
        <section class="restaurant-list-container">
            <ul class="restaurant-list" id="restaurant-list">
                ${restaurants
                  .map(
                    (
                      restaurant: RestaurantType
                    ) => `<li class="restaurant">    <div class="restaurant__category">
                <img
                  src="${CATEGORY_IMAGE_MAPPER[restaurant.category]}"
                  alt="${restaurant.category}"
                  class="category-icon"
                />
              </div>
              <div class="restaurant__info">
                <h3 class="restaurant__name text-subtitle">${
                  restaurant.name
                }</h3>
                <span class="restaurant__distance text-body"
                  >캠퍼스부터 ${DISTANCE_MAPPER[restaurant.distance]}</span
                >
                <p class="restaurant__description text-body">
                  ${restaurant.description || ""}
                </p>
              </div>
              <img
              src="${
                restaurant.bookmark
                  ? "favorite-icon-filled.png"
                  : "favorite-icon-lined.png"
              }"
              alt="${restaurant.category}"
              class="star-icon"
            /></li>`
                  )
                  .join("")}
            </ul>
        </section>
    `;
  }
}
