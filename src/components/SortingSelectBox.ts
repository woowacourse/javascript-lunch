import styleClass from "../constants/styleClass";
import { restaurants } from "../domain/restaurants";

class SortingSelectBox extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.onSelectOption();
  }

  render() {
    this.innerHTML = `
        <select name="sorting" id="sorting-filter" class="${styleClass.restaurant.filter}">
          <option id="sortingOptionName" value="name">이름순</option>
          <option value="distance">거리순</option>
        </select>
      `;
  }

  onSelectOption() {
    const sortingFilter = document.getElementById("sorting-filter");
    if (sortingFilter instanceof HTMLSelectElement) {
      sortingFilter.addEventListener("change", () => {
        this.sortRestaurant(sortingFilter.value);
      });
    }
  }

  sortRestaurant(key: string) {
    restaurants.state.sort = key;
  }
}

export default SortingSelectBox;
