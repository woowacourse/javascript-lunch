import { LABEL_NAMES } from "../../../constants/constants.js";

export default class SelectBox {
  constructor({ label, options }) {
    this.label = label;
    this.options = options;
  }

  render() {
    const $formItem = document.createElement("div");
    $formItem.className = "form-item form-item--required";

    const $label = document.createElement("label");
    $label.setAttribute("for", `${this.label} text-caption`);
    $label.textContent = LABEL_NAMES[this.label];

    const $select = document.createElement("select");
    $select.setAttribute("name", this.label);
    $select.required = true;
    $select.id = this.label;

    const $defaultOption = document.createElement("option");
    $defaultOption.value = "";
    $defaultOption.textContent = "선택해 주세요";

    $formItem.appendChild($label);
    $formItem.appendChild($select);
    $select.appendChild($defaultOption);

    this.options.forEach((option) => {
      const $option = document.createElement("option");
      $option.value = option;

      if (this.label === "distance") $option.textContent = `${option}분 내`;
      else $option.textContent = option;

      $select.appendChild($option);
    });

    return $formItem;
  }
}
