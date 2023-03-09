import SelectComponent from "./SelectComponent";
import dispatcher from "../../domain/Dispatcher";
import { RESTAURANT_ACTION } from "../../abstracts/constants";

class CategoryFilterComponent extends SelectComponent {
  data = {
    filterName: "category",
    list: [
      { value: "전체", name: "전체" },
      { value: "한식", name: "한식" },
      { value: "중식", name: "중식" },
      { value: "일식", name: "일식" },
      { value: "양식", name: "양식" },
      { value: "아시안", name: "아시안" },
      { value: "기타", name: "기타" },
    ],
  };
  handleEvent() {
    this.shadowRoot
      .querySelector("#category-filter")
      .addEventListener("change", (event) =>
        dispatcher(RESTAURANT_ACTION.FILTER_BY_CATEGORY, event.target.value)
      );
  }
}
customElements.define("category-filter-element", CategoryFilterComponent);
export default CategoryFilterComponent;
