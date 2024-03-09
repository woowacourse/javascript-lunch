import RestaurantList from "../../domain/RestaurantList";
import restaurantList from "../../domain/RestaurantList";
import { categoryToIconNameMapper, distancesMapper } from "../../constants";
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

  renderRestaurantList({
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
      const restaurantTag = document.createElement("li");
      restaurantTag.className = "restaurant";
      restaurantTag.innerHTML = /*html*/ `
          <div class="restaurant__category">
            <img
              src="${categoryToIconNameMapper[restaurant.category]}"
              alt="${restaurant.category}"
              class="category-icon"
            />
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
            <span class="restaurant__distance text-body"
              >캠퍼스부터 ${distancesMapper[restaurant.distance]}</span
            >
            <p class="restaurant__description text-body">
              ${restaurant.description || ""}
            </p>
          </div>
        `;
      restaurantFragment.append(restaurantTag);
    });
    $restaurantList.replaceChildren(restaurantFragment);
  }
}

export default RestaurantListSection;
