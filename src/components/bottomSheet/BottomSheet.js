import Button from "../button/Button.js";
import LinkInput from "../linkInput/LinkInput.js";
import SelectBox from "../selectBox/SelectBox.js";
import RestaurantNameInput from "../restaurantNameInput/RestaurantNameInput.js";
import DescriptionInput from "../descriptionInput/DescriptionInput.js";
import RestaurantListItem from "../restaurantListItem/RestaurantListItem.js";
import { CATEGORY, DISTANCE } from "../../constants/constants.js";

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
    options: CATEGORY,
  });

  // 음식점 이름
  const $restaurantFormItem = RestaurantNameInput();

  // 거리
  const $distanceFormItem = SelectBox({
    label: "distance",
    options: DISTANCE,
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

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.querySelector("#category");
    const name = document.querySelector("#name");
    const distance = document.querySelector("#distance");
    const description = document.querySelector("#description");
    const link = document.querySelector("#link");

    const $restaurantItem = RestaurantListItem({
      category: category.value,
      name: name.value,
      distance: distance.value,
      description: description.value,
      link: link.value,
    });

    const $restaurantList = document.querySelector(".restaurant-list");
    $restaurantList.appendChild($restaurantItem);

    category.value = "";
    name.value = "";
    distance.value = "";
    description.value = "";
    link.value = "";

    $modal.classList.remove("modal--open");
  });
  return $modal;
}
