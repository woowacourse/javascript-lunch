import CustomElement from "../../abstracts/CustomElement";
import CategoryFilterComponent from "./CategoryFilterComponent";
import SortFilterComponent from "./SortFilterComponent";

class SelectContainer extends CustomElement {
  template() {
    return `
    <section class="restaurant-filter-container">
        <category-filter-element></category-filter-element>
        <sort-filter-element></sort-filter-element>
    </section>
  
    `;
  }
}

customElements.define("select-container", SelectContainer);

export default SelectContainer;
