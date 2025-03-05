import { SELECT_BOX_LABEL } from "../../../constants/constants";

export default function SelectBox({ label, options }) {
  const $formItem = document.createElement("div");
  $formItem.className = "form-item form-item--required";

  const $label = document.createElement("label");
  $label.setAttribute("for", `${label} text-caption`);
  $label.textContent = SELECT_BOX_LABEL[label];

  const $select = document.createElement("select");
  $select.setAttribute("name", label);
  $select.required = true;
  $select.id = label;

  const $defaultOption = document.createElement("option");
  $defaultOption.value = "";
  $defaultOption.textContent = "선택해 주세요";

  $formItem.appendChild($label);
  $formItem.appendChild($select);
  $select.appendChild($defaultOption);

  options.forEach((option) => {
    const $option = document.createElement("option");
    $option.value = option;
    $option.textContent = option;

    $select.appendChild($option);
  });

  return $formItem;
}
