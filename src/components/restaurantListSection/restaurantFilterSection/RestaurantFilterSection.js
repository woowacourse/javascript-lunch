import RestaurantFilter from "../restaurantFilter/RestaurantFilter.js";
import { CATEGORY, SORTING } from "../../../constants/constants.js";
import "./restaurantFilterSection.css";

export default class RestaurantFilterSection {
  #restaurantList;
  #updateList;
  #selectedTab;

  constructor(restaurantList, updateList, selectedTab) {
    this.#restaurantList = restaurantList;
    this.#updateList = updateList;
    this.#selectedTab = selectedTab;
  }

  render() {
    const $section = document.createElement("section");
    $section.className = "restaurant-filter-container";

    $section.appendChild(
      new RestaurantFilter(
        ["전체", ...CATEGORY],
        "category",
        this.#handleCategoryChange
      ).render()
    );

    $section.appendChild(
      new RestaurantFilter(SORTING, "sorting", () => {}).render()
    );

    return $section;
  }

  #handleCategoryChange = (e) => {
    const { value } = e.target;

    let filterBySelectTab = [...this.#restaurantList];

    if (this.#selectedTab === "bookmark") {
      filterBySelectTab = filterBySelectTab.filter(
        (restaurant) => restaurant.bookmark
      );
    }

    if (value === "전체") {
      this.#updateList(filterBySelectTab);
      return;
    }

    const filteredList = filterBySelectTab.filter(
      (restaurant) => restaurant.category === value
    );
    this.#updateList(filteredList);
  };
}
