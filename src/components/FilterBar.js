import RULES from "../constants/rules";

class FilterBar {
  #$target;
  #props;

  constructor($target, props) {
    this.#$target = $target;
    this.#props = props;

    this.#$target.insertAdjacentHTML("beforeend", this.#template());
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
      <select name="category" id="category-filter" class="restaurant-filter">
        <option value="전체">전체</option>
        ${this.#options()}
      </select>

      <select name="sorting" id="sorting-filter" class="restaurant-filter">
        <option value="name">이름순</option>
        <option value="distance">거리순</option>
      </select>
    </section>
  `;
  }

  #bindEvents() {
    const $categoryFilter = document.querySelector("#category-filter");
    const $sortingFilter = document.querySelector("#sorting-filter");

    $categoryFilter.addEventListener("change", (e) => {
      this.#props.onCategoryChange?.(e.target.value);
    });

    $sortingFilter.addEventListener("change", (e) => {
      this.#props.onSortingChange?.(e.target.value);
    });
  }
}

export default FilterBar;
