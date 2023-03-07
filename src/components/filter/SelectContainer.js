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

      :host {
        width: 100vw;
        position: fixed;
        top: 136px;
        left: 0;
        z-index: 2
      }

      .restaurant-filter-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 32px 16px 38px 16px;
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

customElements.define("select-container", SelectContainer);

export default SelectContainer;
