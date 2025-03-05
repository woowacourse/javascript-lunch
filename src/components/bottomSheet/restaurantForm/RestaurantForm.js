import Button from "../../button/Button.js";
import LinkInput from "../../linkInput/LinkInput.js";
import SelectBox from "../../common/selectBox/SelectBox.js";
import RestaurantNameInput from "../../restaurantNameInput/RestaurantNameInput.js";
import DescriptionInput from "../../descriptionInput/DescriptionInput.js";
import RestaurantListItem from "../../restaurantListItem/RestaurantListItem.js";
import { CATEGORY, DISTANCE } from "../../../constants/constants.js";

export default function RestaurantForm() {
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

  $form.appendChild($categoryFormItem);
  $form.appendChild($restaurantFormItem);
  $form.appendChild($distanceFormItem);
  $form.appendChild($descriptionFormItem);
  $form.appendChild($linkFormItem);
  $form.appendChild($buttonContainer);

  $buttonContainer.appendChild($cancelButton);
  $buttonContainer.appendChild($addButton);

  $cancelButton.addEventListener("click", () => {
    const $modal = document.querySelector(".modal");
    $modal.classList.remove("modal--open");
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

    const $modal = document.querySelector(".modal");
    $modal.classList.remove("modal--open");
  });

  return $form;
}
