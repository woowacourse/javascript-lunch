import data from "../data.ts";
import state from "../state.ts";
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

    filterElement.addEventListener("change", (e) => {
      if (id === "category-filter") this.onChangeCategory(e.target.value);
      if (id === "sorting-filter") this.onChangeSorting(e.target.value);
    });

    return filterElement;
  },

  onChangeCategory(category) {
    const filteredList = RestaurantListUtils.filterByCategory(
      data.restaurantList,
      category
    );
    RestaurantList.applyList(filteredList);
  },

  onChangeSorting(sortingRule) {
    let filteredList = state.currentRestaurantList;
    if (sortingRule === "id")
      filteredList = RestaurantListUtils.sortById(filteredList);
    if (sortingRule === "name")
      filteredList = RestaurantListUtils.sortByName(filteredList);
    if (sortingRule === "distance")
      filteredList = RestaurantListUtils.sortByDistance(filteredList);

    RestaurantList.applyList(filteredList);
  },
};

export default FilterSelect;
