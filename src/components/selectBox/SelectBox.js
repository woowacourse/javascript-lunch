export default function SelectBox({ label, categories }) {
  const $formItem = document.createElement("div");
  $formItem.className = "form-item form-item--required";

  const $label = document.createElement("label");
  $label.setAttribute("for", "category text-caption");
  $label.textContent = label;

  const $select = document.createElement("select");
  $select.setAttribute("name", "category");
  $select.required = true;
  $select.id = "category";

  const $defaultOption = document.createElement("option");
  $defaultOption.value = "";
  $defaultOption.textContent = "선택해 주세요";

  $formItem.appendChild($label);
  $formItem.appendChild($select);
  $select.appendChild($defaultOption);

  categories.forEach((category) => {
    const $option = document.createElement("option");
    $option.value = category;
    $option.textContent = category;

    $select.appendChild($option);
  });

  return $formItem;
}
