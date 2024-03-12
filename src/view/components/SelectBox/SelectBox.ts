import { DEFAULT_UNSELECTED_OPTION } from "../../../constants/selectOptions";
import createElementByTag from "../../generateComponent/utils/createElementByTag";

class SelectBox {
  element = createElementByTag({
    tag: "select",
    classes: ["select-box", "restaurant-filter"],
  });

  constructor(options: string[], hasDefaultOption: boolean = true) {
    const optionElements = this.#createOptions(options);
    if (!hasDefaultOption) this.#setDefaultOption();

    this.element.append(...optionElements);
  }

  #createOptions(options: string[]) {
    return options.map((option) => {
      const optionElement = document.createElement("option");

      optionElement.textContent = option;
      optionElement.value = option;

      return optionElement;
    });
  }

  #setDefaultOption() {
    const defaultOption = this.#createOptions([DEFAULT_UNSELECTED_OPTION])[0];
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.value = "";
    this.element.append(defaultOption);
  }
}

export default SelectBox;
