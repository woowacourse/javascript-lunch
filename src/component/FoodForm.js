import { SELECT_OPTIONS } from "../constants/constants.js";
import { CAPTION } from "../constants/systemMessage.js";
import { getInput } from "../util/getInput.js";
import { Button } from "./button/Button.js";
import { ButtonContainer } from "./button/ButtonContainer.js";
import { Input } from "./input/Input.js";
import { SelectInput } from "./input/SelectInput.js";
import { TextareaInput } from "./input/TextareaInput";

export default class FoodForm {
  constructor({ onCancel = () => {}, onSubmit = () => {} }) {
    this.container = document.createElement("form");

    this.container.appendChild(
      SelectInput({
        isRequired: true,
        name: "category",
        label: "카테고리",
        optionList: SELECT_OPTIONS.category,
      })
    );

    this.container.appendChild(
      Input({
        isRequired: true,
        name: "name",
        label: "이름",
      })
    );

    this.container.appendChild(
      SelectInput({
        isRequired: true,
        name: "distance",
        label: "거리(도보 이동 시간)",
        optionList: SELECT_OPTIONS.distance,
      })
    );

    this.container.appendChild(
      TextareaInput({
        isRequired: false,
        label: "설명",
        name: "description",
        caption: CAPTION.description,
      })
    );

    this.container.appendChild(
      Input({
        isRequired: false,
        label: "참고 링크",
        name: "link",
        caption: CAPTION.link,
      })
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
      })
    );
    this.container.onsubmit = (e) => {
      e.preventDefault();

      const formData = this.getFormInputs();

      onSubmit(formData);
      this.container.reset();
    };
  }
  get element() {
    return this.container;
  }
  getFormInputs() {
    return {
      category: getInput("category"),
      name: getInput("name"),
      distance: getInput("distance"),
      description: getInput("description"),
      link: getInput("link"),
    };
  }
}
