export default function DescriptionInput() {
  const $descriptionFormItem = document.createElement("div");
  $descriptionFormItem.className = "form-item";

  const $descriptionLabel = document.createElement("label");
  $descriptionLabel.setAttribute("for", "description text-caption");
  $descriptionLabel.textContent = "설명";

  const $descriptionTextarea = document.createElement("textarea");
  $descriptionTextarea.id = "description";
  $descriptionTextarea.setAttribute("name", "description");
  $descriptionTextarea.setAttribute("cols", "30");
  $descriptionTextarea.setAttribute("rows", "5");

  const $descriptionHelpText = document.createElement("span");
  $descriptionHelpText.className = "help-text text-caption";
  $descriptionHelpText.textContent = "메뉴 등 추가 정보를 입력해 주세요.";

  $descriptionFormItem.appendChild($descriptionLabel);
  $descriptionFormItem.appendChild($descriptionTextarea);
  $descriptionFormItem.appendChild($descriptionHelpText);

  return $descriptionFormItem;
}
