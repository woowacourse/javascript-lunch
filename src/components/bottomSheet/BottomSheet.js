import Button from "../button/Button.js";
import LinkInput from "../linkInput/LinkInput.js";
import SelectBox from "../selectBox/SelectBox.js";
import RestaurantNameInput from "../restaurantNameInput/RestaurantNameInput.js";
import DescriptionInput from "../descriptionInput/DescriptionInput.js";

export default function BottomSheet({ title }) {
  const $modal = document.createElement("div");
  $modal.className = "modal";

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
    label: "category",
    options: ["한식", "중식", "일식", "기타"],
  });

  // 음식점 이름
  const $restaurantFormItem = RestaurantNameInput();

  // 거리
  const $distanceFormItem = SelectBox({
    label: "distance",
    options: ["5", "10", "15", "20", "30"],
  });

  // 설명
  const $descriptionFormItem = DescriptionInput();

  // 링크
  const $linkFormItem = LinkInput();

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

  $cancelButton.addEventListener("click", () => {
    $modal.classList.remove("modal--open");
  });

  $backdrop.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-container")) {
      $modal.classList.remove("modal--open");
    }
  });

  return $modal;
}
