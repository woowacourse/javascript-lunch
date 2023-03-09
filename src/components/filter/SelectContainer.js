import { CUSTOM_ELEMENT } from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";
import CategoryFilterComponent from "./CategoryFilterComponent";
import SortFilterComponent from "./SortFilterComponent";

class SelectContainer extends CustomElement {
  template() {
    return `
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      .restaurant-filter-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 32px 16px;
        background-color: #fff;
      }
    </style>
    <section class="restaurant-filter-container">
        <category-filter-element></category-filter-element>
        <sort-filter-element></sort-filter-element>
    </section>
  
    `;
  }
}

customElements.define(CUSTOM_ELEMENT.SELECT_CONTAINER, SelectContainer);

export default SelectContainer;
