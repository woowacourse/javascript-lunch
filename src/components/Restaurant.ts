import Component from "../common/Component";
import { CATEGORY_IMAGE_MAPPER, DISTANCE_MAPPER } from "../constants";
import { RestaurantType } from "../types";
import RestaurantStorage from "../domain/RestaurantStorage";

export default class Restaurant extends Component {
  render(): string {
    const { restaurant }: { restaurant: RestaurantType } = this.props;
    return /*html*/ `
        <div class="restaurant">
            <div class="restaurant__category">
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
            id="${restaurant.name}"
            class="star-icon"
                />
        </div>
      
        
        `;
  }

  componentDidMount(): void {
    const { restaurant, loadRestaurant } = this.props;

    const $bookmark = document.querySelector<HTMLImageElement>(
      `#${restaurant.name}`
    );

    $bookmark?.addEventListener("click", (e) => {
      const restaurantName = $bookmark.id;
      RestaurantStorage.toggleBookmark(restaurantName);
      loadRestaurant();
    });
  }
}
