import { $ } from "../../utils/Dom";

export default class FilterBar {
  #template = `
    <main>
        <section class="restaurant-filter-container">
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
        </section>
    </main>
 `;

  constructor(restaurantList, restaurantRegistry) {
    this.restaurantList = restaurantList;
    this.restaurantRegistry = restaurantRegistry;
    document.body.insertAdjacentHTML("beforeend", this.#template);
    const selected = $(".restaurant-filter");
    selected.addEventListener("change", () => {
      const selectedValue = selected.options[selected.selectedIndex].value;
      this.filterCategory(selectedValue);
    });
  }

  filterCategory(selectedValue) {
    this.restaurantList.categoryFilter(selectedValue);
    $(".restaurant-list").replaceChildren();
    const arr = JSON.parse(localStorage.getItem("restaurants"));
    arr.forEach((value) => {
      this.restaurantRegistry.appendRestaurant(value);
    });
  }
}
