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

  setEvent() {}
}

export default Filter;
