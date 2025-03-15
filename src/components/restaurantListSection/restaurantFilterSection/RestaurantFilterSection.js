import RestaurantFilter from "../restaurantFilter/RestaurantFilter.js";
import { CATEGORY, SORTING } from "../../../constants/constants.js";
import "./restaurantFilterSection.css";

export default class RestaurantFilterSection {
  #restaurantList;
  #updateList;
  #selectedTab;
  #category;
  #sorting;

  constructor(
    restaurantList,
    updateList,
    selectedTab,
    category,
    sorting,
    updateSelectValue
  ) {
    this.#restaurantList = restaurantList;
    this.#updateList = updateList;
    this.#selectedTab = selectedTab;
    this.#category = category;
    this.#sorting = sorting;
    this.updateSelectValue = updateSelectValue;
  }

  render() {
    const $section = document.createElement("section");
    $section.className = "restaurant-filter-container";

    $section.appendChild(
      new RestaurantFilter(
        ["전체", ...CATEGORY],
        "category",
        this.#handleCategoryChange,
        this.#category
      ).render()
    );

    $section.appendChild(
      new RestaurantFilter(
        SORTING,
        "sorting",
        this.#handleSortingChange,
        this.#sorting
      ).render()
    );

    return $section;
  }

  #handleCategoryChange = (e) => {
    const { value } = e.target;
    let filterBySelectTab = [...this.#restaurantList];

    const sotring = document.querySelector("#sorting-filter").value;

    if (sotring === "이름순") {
      filterBySelectTab = filterBySelectTab.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }

    if (sotring === "거리순") {
      filterBySelectTab = filterBySelectTab.sort(
        (a, b) => a.distance - b.distance
      );
    }

    if (this.#selectedTab === "bookmark") {
      filterBySelectTab = filterBySelectTab.filter(
        (restaurant) => restaurant.bookmark
      );
    }

    if (value === "전체") {
      this.#updateList(filterBySelectTab);
      this.updateSelectValue(value, "category");
      return;
    }

    const filteredList = filterBySelectTab.filter(
      (restaurant) => restaurant.category === value
    );

    this.#updateList(filteredList);
    this.updateSelectValue(value, "category");
  };

  #handleSortingChange = (e) => {
    const { value } = e.target;
    let filterBySelectTab = [...this.#restaurantList];

    const category = document.querySelector("#category-filter").value;

    if (category !== "전체") {
      filterBySelectTab = filterBySelectTab.filter(
        (restaurant) => restaurant.category === category
      );
    }

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

    this.updateSelectValue(value, "sorting");
  };
}
