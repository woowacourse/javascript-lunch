import RULES from "../../constants/rules.js";

class FilterBar {
  #$target;
  #selectedCategory;
  #selectedSorting;
  #onCategoryChange;
  #onSortingChange;

  constructor(
    $target,
    { selectedCategory, selectedSorting, onCategoryChange, onSortingChange }
  ) {
    this.#$target = $target;
    this.#selectedCategory = selectedCategory;
    this.#selectedSorting = selectedSorting;
    this.#onCategoryChange = onCategoryChange;
    this.#onSortingChange = onSortingChange;

    const template = document.createElement("template");
    template.innerHTML = this.#template().trim();
    this.#$target.appendChild(template.content.firstElementChild);

    this.#$target.querySelector("#category-filter").value =
      this.#selectedCategory;
    this.#$target.querySelector("#sorting-filter").value =
      this.#selectedSorting;
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
      <select name="category" id="category-filter" class="restaurant-filter" data-testid="category-filter">
        <option value="${RULES.ALL_CATEGORY}">전체</option>
        ${this.#options()}
      </select>

      <select name="sorting" id="sorting-filter" class="restaurant-filter" data-testid="sorting">
        <option value="${RULES.SORTING[0]}">이름순</option>
        <option value="${RULES.SORTING[1]}">거리순</option>
      </select>
    </section>
  `;
  }

  #bindEvents() {
    const $categoryFilter = this.#$target.querySelector("#category-filter");
    const $sortingFilter = this.#$target.querySelector("#sorting-filter");

    $categoryFilter.removeEventListener("change", this.#handleCategoryChange);
    $sortingFilter.removeEventListener("change", this.#handleSortingChange);

    $categoryFilter.addEventListener("change", this.#handleCategoryChange);
    $sortingFilter.addEventListener("change", this.#handleSortingChange);
  }

  #handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (this.#onCategoryChange) {
      this.#onCategoryChange(selectedCategory);
    }
  };

  #handleSortingChange = (event) => {
    const selectedSorting = event.target.value;
    if (this.#onSortingChange) {
      this.#onSortingChange(selectedSorting);
    }
  };
}

export default FilterBar;
