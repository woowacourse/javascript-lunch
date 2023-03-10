import { NO_ELEMENT } from "../constants";
import Controller from "../domain/Controller";

class SortingSelectBox extends HTMLElement {
  private controller;

  constructor() {
    super();
    this.controller = Controller.getInstance();
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
    const sortingFilter = document.getElementById("sorting-filter");
    if (sortingFilter instanceof HTMLSelectElement) {
      sortingFilter.addEventListener("change", () => {
        this.controller.sortRestaurants(sortingFilter.value);
      });
    }
  }

  static getOption(): string {
    const sortingFilter = document.getElementById("sorting-filter");
    if (!(sortingFilter instanceof HTMLSelectElement)) {
      return NO_ELEMENT;
    }

    return sortingFilter.value;
  }
}

export default SortingSelectBox;
