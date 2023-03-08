import { CATEGORY, SORT } from "../constants";

class Filter {
  $target;

  constructor($target) {
    this.$target = $target;
    this.render();
  }

  template() {
    return `
        <select name="category" id="category-filter" class="restaurant-filter">
          ${Object.values(CATEGORY).map((categoryValue) => `<option value=${categoryValue}>${categoryValue}</option>`)}
        </select>

        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${Object.values(SORT).map((sortValue) => `<option value="${sortValue}"}>${sortValue}</option>`)}
        </select>
    `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  onChangeSelectBox(restaurantList, restaurantListManager) {
    this.$target.querySelector("#category-filter").addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      const selectedSortingWay = this.$target.querySelector("#sorting-filter").value;

      const filteredList = restaurantListManager.getRestaurantList(selectedSortingWay, selectedCategory);
      restaurantList.renderList(filteredList);
    });

    this.$target.querySelector("#sorting-filter").addEventListener("change", (event) => {
      const selectedSortingWay = event.target.value;
      const selectedCategory = this.$target.querySelector("#category-filter").value;

      const filteredList = restaurantListManager.getRestaurantList(selectedSortingWay, selectedCategory);
      restaurantList.renderList(filteredList);
    });
  }
}

export default Filter;
