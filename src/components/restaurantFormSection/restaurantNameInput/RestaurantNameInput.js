import { LABEL_NAMES } from "../../../constants/constants.js";

export default function RestaurantNameInput() {
  const $restaurantFormItem = document.createElement("div");
  $restaurantFormItem.className = "form-item form-item--required";

  const $restaurantNameLabel = document.createElement("label");
  $restaurantNameLabel.setAttribute("for", "name text-caption");
  // TODO: label text 데이터로 변경
  $restaurantNameLabel.textContent = LABEL_NAMES.name;

  const $restaurantNameInput = document.createElement("input");
  $restaurantNameInput.type = "text";
  $restaurantNameInput.setAttribute("name", "name");
  $restaurantNameInput.id = "name";
  $restaurantNameInput.required = true;

  $restaurantFormItem.appendChild($restaurantNameLabel);
  $restaurantFormItem.appendChild($restaurantNameInput);

  return $restaurantFormItem;
}
