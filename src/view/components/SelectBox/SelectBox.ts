import { DEFAULT_UNSELECTED_OPTION } from "../../../constants/selectOptions";
import createElementByTag from "../../utils/createElementByTag";

class SelectBox {
  element = createElementByTag({
    tag: "select",
    classes: ["select-box", "restaurant-filter"],
  }) as HTMLSelectElement;

  constructor({
    options,
    hasDefaultOption = true,
    eventListenerArgs = [],
  }: {
    options: string[];
    hasDefaultOption?: boolean;
    eventListenerArgs?: EventListenerArg[];
  }) {
    const optionElements = this.#createOptions(options);
    if (!hasDefaultOption) this.#setDefaultOption();

    this.element.append(...optionElements);

    eventListenerArgs.forEach((eventListenerArg) => {
      this.element.addEventListener(...eventListenerArg);
    });
  }

  getValue() {
    return this.element.value;
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
