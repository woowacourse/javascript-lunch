import { $ } from "../../../../utils/domHelpers";
import categorySelect from "../form/categorySelect";
import description from "../form/description";
import distanceSelect from "../form/distanceSelect";
import linkInput from "../form/linkInput";
import nameInput from "../form/nameInput";
import buttonContainer from "../navigation/buttonContainer";

const restaurantAddModal = () => {
  const $modalContainer = $(".modal-container");

  $modalContainer.innerHTML = `
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
      <div class="form-item form-item--required category-select"></div>
      <div class="form-item form-item--required name-input"></div>
      <div class="form-item form-item--required distance-select"></div>
      <div class="form-item description-area"></div>
      <div class="form-item link-input"></div>
      <div class="button-container">
        <button type="button" class="button button--secondary">취소</button>
      </div>
    </form>
  `;

  buttonContainer();
  const $categorySelectContainer = $(".category-select");
  const $nameInputContainer = $(".name-input");
  const $distanceSelectContainer = $(".distance-select");
  const $descriptionContainer = $(".description-area");
  const $linkInputContainer = $(".link-input");

  if ($categorySelectContainer)
    $categorySelectContainer.appendChild(categorySelect());
  if ($nameInputContainer) $nameInputContainer.appendChild(nameInput());
  if ($distanceSelectContainer)
    $distanceSelectContainer.appendChild(distanceSelect());
  if ($descriptionContainer) $descriptionContainer.appendChild(description());
  if ($linkInputContainer) $linkInputContainer.appendChild(linkInput());
};

export default restaurantAddModal;
