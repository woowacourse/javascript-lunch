import { $ } from "../utils/Dom";
import { CATEGORY_NAME } from "../constants";

export default class FilterBar {
  #template = `
            <select name="category" id="category-filter" class="restaurant-filter">
            ${Object.entries(CATEGORY_NAME).map(
              ([key, value]) => `<option value=${value}>${value}</option>`
            )}
            </select>

            <!-- 정렬 셀렉트 박스 -->
            <select name="sorting" id="sorting-filter" class="restaurant-filter">
                <option value="name">이름순</option>
                <option value="distance">거리순</option>
            </select>
 `;

  constructor() {
    const filterBarContainer = $(".restaurant-filter-container");
    filterBarContainer.insertAdjacentHTML("beforeend", this.#template);
  }
}
