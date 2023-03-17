import CustomElement from "../../abstracts/CustomElement";
import dispatcher from "../../domain/Dispatcher";
import { RESTAURANT_ACTION } from "../../abstracts/constants";

class SelectComponent extends CustomElement {
  setEvent() {
    const category_filter = document.querySelector("#category-filter");
    if (category_filter)
      category_filter.addEventListener("change", this.changeCategory);

    const sorting_filter = document.querySelector("#sorting-filter");
    if (sorting_filter)
      sorting_filter.addEventListener("change", this.changeSortMethod);
  }

  changeCategory() {
    const category = document.querySelector("#category-filter").value;
    dispatcher(RESTAURANT_ACTION.FILTER_BY_CATEGORY, category);
  }

  changeSortMethod() {
    const sortMethod = document.querySelector("#sorting-filter").value;
    dispatcher(RESTAURANT_ACTION.SORT_RESTAURANTS, sortMethod);
  }

  template() {
    return `
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
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
            <option value="name">이름순</option>
            <option value="distance">거리순</option>
        </select>
    </section>
  
    `;
  }
}

customElements.define("select-element", SelectComponent);

export default SelectComponent;
