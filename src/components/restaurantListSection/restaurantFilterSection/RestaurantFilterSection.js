import RestaurantFilter from "../restaurantFilter/RestaurantFilter.js";
import { CATEGORY, SORTING } from "../../../constants/constants.js";
import "./restaurantFilterSection.css";

export default class RestaurantFilterSection {
  #restaurantList;
  #updateList;

  constructor(restaurantList, updateList) {
    this.#restaurantList = restaurantList;
    this.#updateList = updateList;
  }

  render() {
    const $section = document.createElement("section");
    $section.className = "restaurant-filter-container";

    $section.appendChild(
      new RestaurantFilter(["전체", ...CATEGORY], "category", () => {}).render()
    );

    $section.appendChild(
      new RestaurantFilter(SORTING, "sorting", () => {}).render()
    );

    return $section;
  }
}
