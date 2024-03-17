import {
  CATEGORY_WITH_ENTIRE,
  SORT_STANDARD,
} from "../constants/selectOptions";

import FavoriteToggler from "../view/components/FavoriteToggler/FavoriteToggler";
import RestaurantListController from "./RestaurantListController";
import RestaurantPreview from "../view/components/RestaurantInfo/RestaurantPreview/RestaurantPreview";
import SelectBox from "../view/components/SelectBox/SelectBox";
import StatusController from "./StatusController";
import TabBar from "../view/components/TabBar/TabBar";
import findAncestorHasClass from "../utils/findAncestorHasClass";

class RenderController {
  static #entireRestaurantListUl =
    document.getElementById("restaurant-list-ul");

  static #favoriteRestaurantListUl = document.getElementById(
    "favorite-restaurant-list-ul"
  );

  static #filterContainer = document.getElementById("filter-container");

  static renderTabBar() {
    const tabBar = new TabBar([
      {
        value: "모든 음식점",
        onFunction: RenderController.showEntireRestaurantAndFilter.bind(this),
        offFunction: RenderController.hideEntireRestaurantAndFilter.bind(this),
      },
      {
        value: "자주 가는 음식점",
        onFunction: RenderController.showFavoriteRestaurantListUl.bind(this),
        offFunction: RenderController.hideFavoriteRestaurantListUl.bind(this),
      },
    ]);
    document.getElementById("main")?.prepend(tabBar.element);
  }

  static renderFilterContainer() {
    const categoryFilter = new SelectBox({
      options: CATEGORY_WITH_ENTIRE,
      eventListenerArgs: [["change", this.renderEntireRestaurantListUl]],
    });
    const sortStandardFilter = new SelectBox({
      options: SORT_STANDARD,
      eventListenerArgs: [["change", this.renderEntireRestaurantListUl]],
    });

    categoryFilter.element.id = "category-filter";
    sortStandardFilter.element.id = "sort-standard-filter";
    this.#filterContainer?.append(
      categoryFilter.element,
      sortStandardFilter.element
    );
  }

  static renderEntireRestaurantListUl() {
    const filteredRestaurants =
      RestaurantListController.getNowEntireRestaurants();
    const restaurantItemElements = filteredRestaurants.map((restaurant) => {
      return this.#getRestaurantPreviewWithToggler(restaurant).element;
    });

    RenderController.#entireRestaurantListUl?.replaceChildren(
      ...restaurantItemElements
    );
  }

  static renderFavoriteRestaurantListUl() {
    const favoriteRestaurants =
      RestaurantListController.getFavoriteRestaurants();
    const restaurantItemElements = favoriteRestaurants.map((restaurant) => {
      return this.#getRestaurantPreviewWithToggler(restaurant).element;
    });

    RenderController.#favoriteRestaurantListUl?.replaceChildren(
      ...restaurantItemElements
    );
  }

  static renderAllUl() {
    RenderController.renderEntireRestaurantListUl();
    RenderController.renderFavoriteRestaurantListUl();
  }

  static appendToMain(element: HTMLElement) {
    document.getElementById("main")?.append(element);
  }

  static hideEntireRestaurantAndFilter() {
    this.#entireRestaurantListUl?.classList.add("display-none");
    this.#filterContainer?.classList.add("display-none");
  }

  static showEntireRestaurantAndFilter() {
    this.#entireRestaurantListUl?.classList.remove("display-none");
    this.#filterContainer?.classList.remove("display-none");
  }

  static hideFavoriteRestaurantListUl() {
    this.#favoriteRestaurantListUl?.classList.add("display-none");
  }

  static showFavoriteRestaurantListUl() {
    this.#favoriteRestaurantListUl?.classList.remove("display-none");
  }

  static #getRestaurantPreviewWithToggler(restaurant: Restaurant) {
    const restaurantPreview = new RestaurantPreview({ restaurant });
    const favoriteToggler = new FavoriteToggler({
      isOn: RestaurantListController.hasRestaurantInFavoriteRestaurant(
        restaurant.name
      ),
      toggleAction: function () {
        const restaurantPreview = findAncestorHasClass(
          favoriteToggler.element,
          "restaurant"
        ) as HTMLElement;

        const name = StatusController.getRestaurantName(restaurantPreview);

        if (favoriteToggler.isOn())
          RestaurantListController.addInFavoriteRestaurantList(name);
        else RestaurantListController.deleteInFavoriteRestaurantList(name);
        RenderController.renderAllUl();
      },
    });
    restaurantPreview.element.append(favoriteToggler.element);
    return restaurantPreview;
  }
}

export default RenderController;
