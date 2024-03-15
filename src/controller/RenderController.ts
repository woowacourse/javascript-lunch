import {
  CATEGORY_WITH_ENTIRE,
  SORT_STANDARD,
} from "../constants/selectOptions";

import RestaurantListController from "./RestaurantListController";
import RestaurantPreview from "../view/components/RestaurantInfo/RestaurantPreview/RestaurantPreview";
import SelectBox from "../view/components/SelectBox/SelectBox";

class RenderController {
  static #restaurantListUl = document.getElementById("restaurant-list-ul");

  static renderFilterContainer() {
    const filterContainer = document.getElementById("filter-container");

    const categoryFilter = new SelectBox({
      options: CATEGORY_WITH_ENTIRE,
      eventListenerArgs: [["change", this.renderRestaurantListUl]],
    });
    const sortStandardFilter = new SelectBox({
      options: SORT_STANDARD,
      eventListenerArgs: [["change", this.renderRestaurantListUl]],
    });

    categoryFilter.element.id = "category-filter";
    sortStandardFilter.element.id = "sort-standard-filter";
    filterContainer?.append(categoryFilter.element, sortStandardFilter.element);
  }

  static renderRestaurantListUl() {
    const filteredRestaurantItem =
      RestaurantListController.getNowRestaurantItem();
    const restaurantItemElements = filteredRestaurantItem.map((restaurant) => {
      return new RestaurantPreview({ restaurant }).element;
    });

    RenderController.#restaurantListUl?.replaceChildren(
      ...restaurantItemElements
    );
  }

  static renderInMain(element: HTMLElement) {
    document.getElementById("main")?.append(element);
  }
}

export default RenderController;
