import data from "../data.ts";
import state from "../state.ts";
import { $ } from "../utils/querySelectors.js";
import RestaurantListUtils from "../utils/RestaurantListUtils.ts";
import RestaurantList from "./RestaurantList.js";

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

    filterElement.addEventListener("change", (e) => this.applyFilter());

    return filterElement;
  },

  applyFilter() {
    const category = $("#category-filter").value;
    const sortingRule = $("#sorting-filter").value;
    const filteredListByCategory = this.getFilteredListByCategory(
      data.restaurantList,
      category
    );
    const filteredListByBoth = this.getFilteredListBySorting(
      filteredListByCategory,
      sortingRule
    );
    RestaurantList.applyList(filteredListByBoth);
  },

  getFilteredListByCategory(restaurantList, category) {
    const filteredList = RestaurantListUtils.filterByCategory(
      restaurantList,
      category
    );

    return filteredList;
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
