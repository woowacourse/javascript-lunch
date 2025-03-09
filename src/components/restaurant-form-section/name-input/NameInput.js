import { LABEL_NAMES } from "../../../constants/constants.js";

export default class NameInput {
  render() {
    const $nameFormItem = document.createElement("div");
    $nameFormItem.className = "form-item form-item--required";

    const $nameLabel = document.createElement("label");
    $nameLabel.setAttribute("for", "name text-caption");
    $nameLabel.textContent = LABEL_NAMES.name;

    const $nameInput = document.createElement("input");
    $nameInput.type = "text";
    $nameInput.setAttribute("name", "name");
    $nameInput.id = "name";
    $nameInput.required = true;

    $nameFormItem.appendChild($nameLabel);
    $nameFormItem.appendChild($nameInput);

    return $nameFormItem;
  }
}
