import { RESTAURANT_LIST_KEY } from "../constants/constants.ts";
import LocalStorage from "../utils/LocalStorage.ts";
import { $ } from "../utils/querySelectors.js";
import Renderer from "../utils/Renderer.js";
import RestaurantListUtils from "../utils/RestaurantListUtils.ts";

const FilterSelect = {
  create({ id, name, dropdownList }) {
    const filterElement = document.createElement("select");
    filterElement.id = id;
    filterElement.name = name;
    filterElement.classList.add("restaurant-filter");
    filterElement.innerHTML = /*html*/ `
    ${dropdownList
      .map(({ label, value }) => `<option value="${value}">${label}</option>`)
      .join("\n")}
    `;

    filterElement.addEventListener("change", (e) =>
      Renderer.filteredList("allRestaurant")
    );

    return filterElement;
  },

  getFilteredList() {
    const category = $("#category-filter").value;
    const sortingRule = $("#sorting-filter").value;
    const filteredListByCategory = FilterSelect.getFilteredListByCategory(
      LocalStorage.getJSON(RESTAURANT_LIST_KEY),
      category
    );
    const filteredListByBoth = FilterSelect.getFilteredListBySorting(
      filteredListByCategory,
      sortingRule
    );

    return filteredListByBoth;
  },

  getFilteredListByCategory(restaurantList, category) {
    return RestaurantListUtils.filterByCategory(restaurantList, category);
  },

  getFilteredListBySorting(restaurantList, sortingRule) {
    let filteredList = [...restaurantList];
    if (sortingRule === "id")
      filteredList = RestaurantListUtils.sortById(filteredList);
    if (sortingRule === "name")
      filteredList = RestaurantListUtils.sortByName(filteredList);
    if (sortingRule === "distance")
      filteredList = RestaurantListUtils.sortByDistance(filteredList);

    return filteredList;
  },
};

export default FilterSelect;
