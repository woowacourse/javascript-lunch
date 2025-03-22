import { CATEGORY_OPTIONS, DISTANCE_OPTIONS } from "../constants/options.js";
import CustomDropdown from "../shared/CustomDropdown.js";
import CustomInput from "../shared/CustomInput.js";
import CustomButton from "../shared/CustomButton.js";
import { handleAddRestaurant } from "../handlers/restaurantHandler.js";
import removeModal from "../utils/removeModal.js";

export default function AddRestaurantModal() {
  const formFields = [
    {
      type: "dropdown",
      label: "카테고리",
      name: "category",
      id: "category",
      options: CATEGORY_OPTIONS,
      required: true,
    },
    {
      type: "input",
      label: "이름",
      name: "name",
      id: "name",
      inputType: "text",
      required: true,
    },
    {
      type: "dropdown",
      label: "거리(도보 이동 시간)",
      name: "distance",
      id: "distance",
      options: DISTANCE_OPTIONS,
      required: true,
    },
    {
      type: "textarea",
      label: "설명",
      name: "description",
      id: "description",
      cols: 30,
      rows: 5,
      helpText: "메뉴 등 추가 정보를 입력해 주세요.",
    },
    {
      type: "input",
      label: "참고 링크",
      name: "link",
      id: "link",
      inputType: "text",
      required: false,
    },
  ];

  const formFieldsHTML = formFields
    .map((field) => {
      switch (field.type) {
        case "dropdown":
          return CustomDropdown({
            label: field.label,
            name: field.name,
            id: field.id,
            options: field.options,
            required: field.required,
          });

        case "input":
          return CustomInput({
            label: field.label,
            name: field.name,
            id: field.id,
            type: field.inputType,
            required: field.required,
          });

        case "textarea":
          return `
          <div class="form-item">
            <label for="${field.id}" class="text-caption">${field.label}</label>
            <textarea
              name="${field.name}"
              id="${field.id}"
              cols="${field.cols}"
              rows="${field.rows}"
            ></textarea>
            ${field.helpText ? `<span class="help-text text-caption">${field.helpText}</span>` : ""}
          </div>
        `;

        default:
          return "";
      }
    })
    .join("");

  const cancelButton = CustomButton(
    "close-modal",
    "button--secondary",
    "취소하기",
  );
  const submitButton = CustomButton("", "button--primary", "추가하기");

  // HTML 문자열 반환
  const modalHTML = /* html */ `
    <div class="modal modal--open">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form>
          ${formFieldsHTML}
          <div class="button-container">
            ${cancelButton}
            ${submitButton}
          </div>
        </form>
      </div>
    </div>
  `;

  function render(container) {
    const existingModal = document.querySelector(".modal");
    if (existingModal) {
      existingModal.remove();
    }

    container.insertAdjacentHTML("beforeend", modalHTML);
    setupModalEventListeners();

    return document.querySelector(".modal");
  }

  // 이벤트 리스너 설정 함수
  function setupModalEventListeners() {
    const $closeModalButton = document.getElementById("close-modal");
    const $addRestaurantButton = document.querySelector(".button--primary");
    const $modalBackdrop = document.querySelector(".modal-backdrop");

    if ($closeModalButton) {
      $closeModalButton.addEventListener("click", (e) => {
        e.preventDefault();
        removeModal();
      });
    }

    if ($modalBackdrop) {
      $modalBackdrop.addEventListener("click", () => {
        removeModal();
      });
    }

    if ($addRestaurantButton) {
      $addRestaurantButton.addEventListener("click", handleAddRestaurant);
    }
  }

  return {
    render,
  };
}
