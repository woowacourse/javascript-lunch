import RestaurantList from "../../domain/RestaurantList";
import { categoryToIconNameMapper, distancesMapper } from "../../constants";
import { Category, SortingStandard } from "../../types";

class RestaurantListSection {
  private restaurantList;

  constructor(restaurantList: RestaurantList) {
    this.restaurantList = restaurantList;
  }

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
    const restaurants = this.restaurantList.getRestaurants({
      category,
      sortingStandard,
    });

    restaurants.forEach((restaurant) => {
      const restaurantTag = document.createElement("li");
      restaurantTag.className = "restaurant";
      restaurantTag.dataset.id = restaurant.id.toString();
      restaurantTag.innerHTML = /*html*/ `
          <div class="restaurant__category">
            <img
              src="${categoryToIconNameMapper[restaurant.category]}"
              alt="${restaurant.category}"
              class="category-icon"
            />
          </div>
          <div class="restaurant__info">
            <div class="restaurant__header">
              <div>
                <h3 class="restaurant__name text-subtitle">${
                  restaurant.name
                }</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${
                  distancesMapper[restaurant.distance]
                }</span>
              </div>
              <img
                  class="favorite-icon"
                  src=${
                    restaurant.isGoTo
                      ? "favorite-icon-filled.png"
                      : "favorite-icon-lined.png"
                  }
                  alt=${
                    restaurant.isGoTo ? "자주가는음식점" : "자주가지않는음식점"
                  }
                />
            </div>
            <p class="restaurant__description text-body">
              ${restaurant.description || ""}
            </p>
          </div>
        `;
      restaurantFragment.append(restaurantTag);
    });
    $restaurantList.replaceChildren(restaurantFragment);
  }

  setEvent(type: string, listener: (id: number) => void) {
    const $restaurantList = document.querySelector("#restaurant-list");
    if ($restaurantList === null) {
      return;
    }
    $restaurantList.addEventListener(type, (event: Event) => {
      const $target = event.target as Element;
      if ($target.classList.contains("favorite-icon")) {
        return;
      }
      const id = ($target.closest(`[data-id]`) as HTMLElement).dataset.id;
      listener(Number(id));
    });
  }

  setToggleIsGoToEvent(type: string, listener: () => void) {
    const $restaurantList = document.querySelector("#restaurant-list");
    if ($restaurantList === null) {
      return;
    }
    $restaurantList.addEventListener(type, (event: Event) => {
      const $target = event.target as Element;
      if (!$target.classList.contains("favorite-icon")) {
        return;
      }
      const id = ($target.closest(`[data-id]`) as HTMLElement).dataset.id;
      this.restaurantList.toggleIsGoTo(Number(id));
      listener();
    });
  }
}

export default RestaurantListSection;
