import restaurantList from "../../domain/RestaurantList";
import { CATEGORY_IMAGE_MAPPER, DISTANCE_MAPPER } from "../../constants";
import { Category, SortingStandard } from "../../types";

class RestaurantListSection {
  renderInit() {
    return /*html*/ `
      <section class="restaurant-list-container">
        <ul class="restaurant-list" id="restaurant-list">
        </ul>
      </section>
    `;
  }

  renderRestauantList({
    category,
    sortingStandard,
  }: {
    category: Category | "전체";
    sortingStandard: SortingStandard;
  }) {
    const $restaurantList = document.querySelector(
      "#restaurant-list"
    ) as HTMLUListElement;

    const restaurantFragment = new DocumentFragment();
    const restaurants = restaurantList.getRestaurants({
      category,
      sortingStandard,
    });

    restaurants.forEach((restaurant) => {
      const restauantTag = document.createElement("li");
      restauantTag.className = "restaurant";
      restauantTag.innerHTML = /*html*/ `
          <div class="restaurant__category">
            <img
              src="${CATEGORY_IMAGE_MAPPER[restaurant.category]}"
              alt="${restaurant.category}"
              class="category-icon"
            />
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
            <span class="restaurant__distance text-body"
              >캠퍼스부터 ${DISTANCE_MAPPER[restaurant.distance]}</span
            >
            <p class="restaurant__description text-body">
              ${restaurant.description || ""}
            </p>
          </div>
          <img
          src="favorite-icon-filled.png"
          alt="${restaurant.category}"
          class="star-icon"
        />
        `;
      restaurantFragment.append(restauantTag);
    });
    $restaurantList.replaceChildren(restaurantFragment);
  }
}

export default RestaurantListSection;
