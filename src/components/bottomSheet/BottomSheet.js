import Button from "../button/Button.js";
import SelectBox from "../selectBox/SelectBox.js";

export default function BottomSheet({ title }) {
  const $modal = document.createElement("div");
  $modal.className = "modal modal--open";

  const $backdrop = document.createElement("div");
  $backdrop.className = "modal-backdrop";

  const $container = document.createElement("div");
  $container.className = "modal-container";

  const $title = document.createElement("h2");
  $title.className = "modal-title text-title";
  $title.textContent = title;

  const $form = document.createElement("form");

  // 카테고리
  const $categoryFormItem = SelectBox({
    label: "카테고리",
    categories: ["한식", "중식", "일식", "기타"],
  });

  // 음식점 이름
  const $restaurantFormItem = document.createElement("div");
  $restaurantFormItem.className = "form-item form-item--required";

  const $restaurantNameLabel = document.createElement("label");
  $restaurantNameLabel.setAttribute("for", "name text-caption");
  // TODO: label text 데이터로 변경
  $restaurantNameLabel.textContent = "이름";

  const $restaurantNameInput = document.createElement("input");
  $restaurantNameInput.type = "text";
  $restaurantNameInput.setAttribute("name", "name");
  $restaurantNameInput.id = "name";
  $restaurantNameInput.required = true;

  $restaurantFormItem.appendChild($restaurantNameLabel);
  $restaurantFormItem.appendChild($restaurantNameInput);

  // 거리
  const $distanceFormItem = SelectBox({
    label: "거리(도보 이동 시간)",
    categories: ["5", "10", "15", "20", "30"],
  });

  // 설명
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

  // 링크
  const $linkFormItem = document.createElement("div");
  $linkFormItem.className = "form-item";

  const $linkLabel = document.createElement("label");
  $linkLabel.setAttribute("for", "link text-caption");
  // TODO: label text 데이터로 변경
  $linkLabel.textContent = "참고 링크";

  const $linkInput = document.createElement("input");
  $linkInput.type = "text";
  $linkInput.setAttribute("name", "link");
  $linkInput.id = "link";

  const $linkHelpText = document.createElement("span");
  $linkHelpText.className = "help-text text-caption";
  $linkHelpText.textContent =
    "매장 정보를 확인할 수 있는 링크를 입력해 주세요.";

  $linkFormItem.appendChild($linkLabel);
  $linkFormItem.appendChild($linkInput);
  $linkFormItem.appendChild($linkHelpText);

  // 취소/추가 버튼
  const $buttonContainer = document.createElement("div");
  $buttonContainer.className = "button-container";

  const $cancelButton = Button({ text: "취소하기", action: "cancel" });
  const $addButton = Button({
    type: "submit",
    text: "추가하기",
    action: "add",
  });

  $modal.appendChild($backdrop);
  $modal.appendChild($container);
  $container.appendChild($title);
  $container.appendChild($form);
  $form.appendChild($categoryFormItem);
  $form.appendChild($restaurantFormItem);
  $form.appendChild($distanceFormItem);
  $form.appendChild($descriptionFormItem);
  $form.appendChild($linkFormItem);
  $form.appendChild($buttonContainer);
  $buttonContainer.appendChild($cancelButton);
  $buttonContainer.appendChild($addButton);

  return $modal;
}
