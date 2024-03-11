import BaseComponent from "../BaseComponent/BaseComponent";

import Dropdown from "../../utils/Dropdown";
import RestaurantAddForm from "./RestaurantAddForm";

class FormDistanceDropdown extends BaseComponent {
  private distanceDropdownConfig = {
    name: "distance",
    id: "distance",
    className: "",
    options: {
      contents: [
        "선택해주세요",
        ...RestaurantAddForm.DISTANCES_OPTIONS.map((value) => `${value}분 내`),
      ],
      values: ["", ...RestaurantAddForm.DISTANCES_OPTIONS],
    },
    eventType: "",
    eventHandler: (event: Event) => {},
  };

  private dropdown = new Dropdown(this.distanceDropdownConfig);

  constructor() {
    super();
  }

  protected render(): void {
    this.innerHTML = this.dropdown.getInnerHTML();
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

customElements.define("form-distance-dropdown", FormDistanceDropdown);

export default FormDistanceDropdown;
