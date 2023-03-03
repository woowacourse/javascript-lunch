class SortingSelectBox extends HTMLElement {
  controller;

  constructor() {
    super();
    this.controller = globalThis.controller;
    this.render();
    this.onSelectOption();
  }

  render() {
    this.innerHTML = `
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option id="sortingOptionName" value="name">이름순</option>
          <option value="distance">거리순</option>
        </select>
      `;
  }

  onSelectOption() {
    const sortingFilter: any = document.getElementById("sorting-filter");
    sortingFilter?.addEventListener("change", () => {
      this.controller.sortRestaurants(sortingFilter.value);
    });
  }
}

export default SortingSelectBox;
