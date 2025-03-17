import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH, SELECT_OPTIONS } from "../../constants/constants.js";
import { CAPTION } from "../../constants/systemMessage.ts";
import { validateLength, validateRequiredInput, validateURL } from "../../validate/validateCondition.js";
import { Button } from "../button/button/Button.js";
import { ButtonContainer } from "../button/button-container/ButtonContainer.js";
import { Input } from "../input/Input.js";
import { SelectInput } from "../input/SelectInput.js";
import { TextareaInput } from "../input/TextareaInput.js";
import { alertError } from "../common/alert/alertError.js";
import { DEV_ERROR_MESSAGE } from "../../constants/devErrorMessage.ts";

interface FoodFormOptions {
  onCancel: () => void;
  onSubmit: (formData: FoodItemType) => void;
}

export default class FoodForm {
  container: HTMLFormElement;

  constructor({ onCancel = () => {}, onSubmit = () => {} }: FoodFormOptions) {
    this.container = document.createElement("form");
    this.container.setAttribute("novalidate", "true");

    const title = document.createElement("h2");
    title.classList.add("modal-title", "text-title");
    title.innerText = "새로운 음식점";

    this.container.appendChild(title);

    this.container.appendChild(
      SelectInput({
        isRequired: true,
        name: "category",
        label: "카테고리",
        optionList: SELECT_OPTIONS.category,
      }),
    );

    this.container.appendChild(
      Input({
        isRequired: true,
        name: "name",
        label: "이름",
      }),
    );

    this.container.appendChild(
      SelectInput({
        isRequired: true,
        name: "distance",
        label: "거리(도보 이동 시간)",
        optionList: SELECT_OPTIONS.distance,
      }),
    );

    this.container.appendChild(
      TextareaInput({
        isRequired: false,
        label: "설명",
        name: "description",
        caption: CAPTION.description,
      }),
    );

    this.container.appendChild(
      Input({
        isRequired: false,
        label: "참고 링크",
        name: "link",
        caption: CAPTION.link,
      }),
    );

    this.container.appendChild(
      ButtonContainer({
        buttons: [
          Button({
            name: "cancel",
            cssType: "secondary",
            innerText: "취소하기",
            onClick: onCancel,
          }),
          Button({
            name: "submit",
            type: "submit",
            cssType: "primary",
            innerText: "추가하기",
          }),
        ],
      }),
    );

    this.container.onsubmit = (e) => {
      e.preventDefault();

      try {
        const formData = this.getFormInputs();
        this.validateFoodForm(formData);
        onSubmit(formData);

        this.container.reset();
      } catch (error: unknown) {
        if (!(error instanceof Error)) {
          throw new Error(DEV_ERROR_MESSAGE.invalidElement);
        }
        const customError = error;
        alertError(customError.message);
      }
    };
  }

  getFormInputs() {
    const formData = new FormData(this.container);
    const formObject = Object.fromEntries(formData.entries());

    const foodItem: FoodItemType = {
      id: crypto.randomUUID(),
      isFavorite: false,
      name: String(formObject.name),
      category: String(formObject.category),
      distance: String(formObject.distance),
      description: String(formObject.description),
      link: String(formObject.link),
    };

    return foodItem;
  }

  validateFoodForm(formData: FoodItemType) {
    validateRequiredInput(formData.category);
    validateRequiredInput(formData.name);
    validateLength(formData.name, NAME_MAX_LENGTH);
    validateRequiredInput(formData.distance);
    validateLength(formData.description, DESCRIPTION_MAX_LENGTH);
    validateURL(formData.link);
  }

  get element() {
    return this.container;
  }
}
