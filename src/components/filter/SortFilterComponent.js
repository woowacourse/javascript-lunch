import SelectComponent from "./SelectComponent";
import dispatcher from "../../domain/Dispatcher";
import { RESTAURANT_ACTION } from "../../abstracts/constants";

class SortFilterComponent extends SelectComponent {
  data = {
    filterName: "sorting",
    list: [
      { value: "name", name: "이름순" },
      { value: "distance", name: "거리순" },
    ],

    handleEvent() {
      this.querySelector("#sorting-filter").addEventListener(
        "change",
        (event) =>
          dispatcher(RESTAURANT_ACTION.SORT_RESTAURANTS, event.target.value)
      );
    },
  };
}

customElements.define("sort-filter-element", SortFilterComponent);
export default SortFilterComponent;
