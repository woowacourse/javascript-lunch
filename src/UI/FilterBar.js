import { $ } from "../utils/Dom";
import { sortByName, sortByDistance } from "../utils/Sort";
import { CATEGORY_NAME } from "../constants";
import { getLocalStorage } from "../utils/LocalStorage";

export default class FilterBar {
  #template = `
            <select name="category" id="category-filter" class="restaurant-filter">
                <option value="${CATEGORY_NAME.total}">${CATEGORY_NAME.total}</option>
                <option value="${CATEGORY_NAME.korean}">${CATEGORY_NAME.korean}</option>
                <option value="${CATEGORY_NAME.chinese}">${CATEGORY_NAME.chinese}</option>
                <option value="${CATEGORY_NAME.japanese}">${CATEGORY_NAME.japanese}</option>
                <option value="${CATEGORY_NAME.western}">${CATEGORY_NAME.western}</option>
                <option value="${CATEGORY_NAME.asian}">${CATEGORY_NAME.asian}</option>
                <option value="${CATEGORY_NAME.etc}">${CATEGORY_NAME.etc}</option>
            </select>

            <!-- 정렬 셀렉트 박스 -->
            <select name="sorting" id="sorting-filter" class="restaurant-filter">
                <option value="name">이름순</option>
                <option value="distance">거리순</option>
            </select>
 `;

  constructor(restaurantList, restaurantItem) {
    this.restaurantList = restaurantList;
    this.restaurantItem = restaurantItem;
    const filterBarContainer = $(".restaurant-filter-container");
    filterBarContainer.insertAdjacentHTML("beforeend", this.#template);
  }
}
