import BaseComponent from "../BaseComponent/BaseComponent";

import Dropdown from "../../utils/Dropdown";
import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";

class FormCategoryDropdown extends BaseComponent {
  private categoryDropdownConfig = {
    name: "category",
    id: "category",
    className: "",
    options: {
      contents: ["선택해주세요", ...Object.values(MENU_CATEGORIES).slice(1)],
      values: ["", ...Object.values(MENU_CATEGORIES).slice(1)],
    },
    eventType: "",
    eventHandler: (event: Event) => {},
  };

  private dropdown = new Dropdown(this.categoryDropdownConfig);

  constructor() {
    super();
  }

  protected render(): void {
    this.innerHTML = this.dropdown.getTemplate();
    this.setFormAttributes();
  }

  protected setSelectRequired() {
    const selectElem = this.querySelector("select");
    if (selectElem) {
      selectElem.required = true;
    }
  }

  protected setFormAttributes() {
    this.classList.add("form-item");

    this.setSelectRequired();
  }
}

customElements.define("form-category-dropdown", FormCategoryDropdown);

export default FormCategoryDropdown;
