import SelectComponent from "./SelectComponent";
import dispatcher from "../../domain/Dispatcher";
import { RESTAURANT_ACTION, SORT_METHOD } from "../../abstracts/constants";

class SortFilterComponent extends SelectComponent {
  data = {
    filterName: "sorting",
    list: [
      { value: SORT_METHOD.NAME, name: "이름순" },
      { value: SORT_METHOD.DISTANCE, name: "거리순" },
    ],
  };

  handleEvent() {
    this.shadowRoot
      .querySelector("#sorting-filter")
      .addEventListener("change", (event) =>
        dispatcher(RESTAURANT_ACTION.SORT_RESTAURANTS, event.target.value)
      );
  }
}

customElements.define("sort-filter-element", SortFilterComponent);
export default SortFilterComponent;
