import { $ } from "../utils/Dom";
import { sortByName, sortByDistance } from "../utils/Sort";

export default class FilterBar {
  #template = `
            <select name="category" id="category-filter" class="restaurant-filter">
                <option value="전체">전체</option>
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="양식">양식</option>
                <option value="아시안">아시안</option>
                <option value="기타">기타</option>
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
    this.handleSelectedValue();
    this.handleSortedValue();
  }

  handleSelectedValue() {
    const selected = $("#category-filter");
    selected.addEventListener("change", () => {
      const selectedValue = selected.options[selected.selectedIndex].value;
      this.filterCategory(selectedValue);
    });
  }

  handleSortedValue() {
    const sorted = $("#sorting-filter");
    sorted.addEventListener("change", () => {
      const sortedValue = sorted.options[sorted.selectedIndex].value;
      if (sortedValue === "name") this.filterByName();
      if (sortedValue === "distance") this.filterByDistance();
    });
  }

  filterCategory(selectedValue) {
    this.restaurantList.categoryFilter(selectedValue);
    $(".restaurant-list").replaceChildren();
    const restaurantParsedInfo = this.parseInfo();
    this.render(restaurantParsedInfo);
  }

  filterByName() {
    $(".restaurant-list").replaceChildren();
    const restaurantParsedInfo = this.parseInfo();
    sortByName(restaurantParsedInfo);
    this.render(restaurantParsedInfo);
  }

  filterByDistance() {
    $(".restaurant-list").replaceChildren();
    const restaurantParsedInfo = this.parseInfo();
    sortByDistance(restaurantParsedInfo);
    this.render(restaurantParsedInfo);
  }

  parseInfo() {
    return JSON.parse(localStorage.getItem("restaurants"));
  }

  render(restaurantParsedInfo) {
    restaurantParsedInfo.forEach((restaurant) => {
      this.restaurantItem.render(restaurant);
    });
  }
}
