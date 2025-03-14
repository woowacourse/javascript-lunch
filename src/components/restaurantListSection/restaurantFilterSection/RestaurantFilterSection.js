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
      new RestaurantFilter(
        SORTING,
        "sorting",
        this.#handleSortingChange
      ).render()
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

  #handleSortingChange = (e) => {
    const { value } = e.target;

    let filterBySelectTab = [...this.#restaurantList];

    if (this.#selectedTab === "bookmark") {
      filterBySelectTab = filterBySelectTab.filter(
        (restaurant) => restaurant.bookmark
      );
    }

    if (value === "이름순") {
      const filteredList = filterBySelectTab.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      this.#updateList(filteredList);
    }

    if (value === "거리순") {
      this.#updateList(
        filterBySelectTab.sort((a, b) => a.distance - b.distance)
      );
    }
  };
}
