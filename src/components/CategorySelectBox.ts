class CategorySelectBox extends HTMLElement {
  controller;

  constructor() {
    super();
    this.controller = globalThis.controller;
    this.render();
    this.onSelectOption();
  }

  render() {
    this.innerHTML = `
      <select name="category" id="category-filter" class="restaurant-filter">
        <option value="전체">전체</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
        <option value="아시안">아시안</option>
        <option value="기타">기타</option>
      </select>
      `;
  }

  onSelectOption() {
    const categoryFilter = document.getElementById("category-filter");
    if (!(categoryFilter instanceof HTMLSelectElement)) {
      return;
    }
    categoryFilter?.addEventListener("change", () => {
      this.controller.filterRestaurants(categoryFilter.value);
    });
  }
}

export default CategorySelectBox;
