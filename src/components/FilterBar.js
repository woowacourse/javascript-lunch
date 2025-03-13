import RULES from "../constants/rules";

class FilterBar {
  #$target;
  #props;

  constructor($target, props) {
    this.#$target = $target;
    this.#props = props;

    this.#$target.insertAdjacentHTML("beforeend", this.#template());
    this.#$target.querySelector("#category-filter").value =
      this.#props.selectedCategory;
    this.#$target.querySelector("#sorting-filter").value =
      this.#props.selectedSorting;
    this.#bindEvents();
  }

  #options() {
    return RULES.CATEGORIES.map((category) => {
      return /*html*/ `
        <option value="${category}">${category}</option>
      `;
    }).join("");
  }

  #template() {
    return /*html*/ `
    <section class="restaurant-filter-container">
      <select name="category" id="category-filter" class="restaurant-filter" data-testid="category">
        <option value="전체">전체</option>
        ${this.#options()}
      </select>

      <select name="sorting" id="sorting-filter" class="restaurant-filter" data-testid="sorting">
        <option value="name">이름순</option>
        <option value="distance">거리순</option>
      </select>
    </section>
  `;
  }

  #bindEvents() {
    const $categoryFilter = document.querySelector("#category-filter");
    const $sortingFilter = document.querySelector("#sorting-filter");

    $categoryFilter.removeEventListener("change", this.#handleCategoryChange);
    $sortingFilter.removeEventListener("change", this.#handleSortingChange);

    $categoryFilter.addEventListener("change", this.#handleCategoryChange);
    $sortingFilter.addEventListener("change", this.#handleSortingChange);
  }

  #handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (this.#props.onCategoryChange) {
      this.#props.onCategoryChange(selectedCategory);
    }
  };

  #handleSortingChange = (event) => {
    const selectedSorting = event.target.value;
    if (this.#props.onSortingChange) {
      this.#props.onSortingChange(selectedSorting);
    }
  };
}

export default FilterBar;
