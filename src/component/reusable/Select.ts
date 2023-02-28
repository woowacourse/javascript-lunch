import { valueToNode } from "@babel/types";
import { createElement } from "../../utils/Dom";

interface Attribute {
  id: string;
  className: string;
  name: string;
  required?: boolean;
}

class Select {
  private select: Element;
  private selectedValue: string;

  constructor({ id, className, name, required }: Attribute, values: string[]) {
    this.select = createElement("select");
    this.selectedValue = "";
    this.generateElement({ id, className, name, required });
    this.generateOptions(values);
    this.activate();
  }

  generateElement({ id, className, name, required }: Attribute) {
    this.select.id = id;
    this.select.className = className;
    this.select.setAttribute("name", name);

    if (required) {
      this.select.setAttribute("required", "");
    }
  }

  generateOptions(values: string[]) {
    values.forEach((value) => {
      const $option = createElement("option");
      $option.setAttribute("value", value);
      $option.textContent = value;

      this.select.append($option);
    });
  }

  getElement() {
    return this.select;
  }

  activate() {
    this.select.addEventListener("change", (e) => {
      const select = this.select as HTMLSelectElement;
      const selectedOption = select.options[select.selectedIndex];

      this.selectedValue = selectedOption.value;
    });
  }

  getSelctedValue() {
    return this.selectedValue;
  }
}

export default Select;
