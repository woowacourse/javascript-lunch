import {
  CATEGORY_WITH_ENTIRE,
  SORT_STANDARD,
} from "../constants/selectOptions";

import FavoriteToggler from "../view/components/FavoriteToggler/FavoriteToggler";
import RestaurantListController from "./RestaurantListController";
import RestaurantPreview from "../view/components/RestaurantInfo/RestaurantPreview/RestaurantPreview";
import SelectBox from "../view/components/SelectBox/SelectBox";
import StatusController from "./StatusController";
import findAncestorHasClass from "../utils/findAncestorHasClass";

class RenderController {
  static #entireRestaurantListUl =
    document.getElementById("restaurant-list-ul");

  static renderFilterContainer() {
    const filterContainer = document.getElementById("filter-container");

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
    filterContainer?.append(categoryFilter.element, sortStandardFilter.element);
  }

  static renderEntireRestaurantListUl() {
    const filteredRestaurantItem =
      RestaurantListController.getNowRestaurantItem();
    const restaurantItemElements = filteredRestaurantItem.map((restaurant) => {
      return this.#getRestaurantPreviewWithToggler(restaurant).element;
    });

    RenderController.#entireRestaurantListUl?.replaceChildren(
      ...restaurantItemElements
    );
  }

  static appendToMain(element: HTMLElement) {
    document.getElementById("main")?.append(element);
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
      },
    });
    restaurantPreview.element.append(favoriteToggler.element);
    return restaurantPreview;
  }
}

export default RenderController;
