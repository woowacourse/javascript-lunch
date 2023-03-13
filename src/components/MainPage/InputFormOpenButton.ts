import { $, ControlDom } from "../../until/ControlDom";
import addButtonImg from "../../../templates/add-button.png";

const InputFormOpenButton = {
  template() {
    return `
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src=${addButtonImg} alt="음식점 추가">
      </button>`;
  },

  setEvent() {
    const gnbButton = $(".gnb__button");

    gnbButton?.addEventListener("click", () => {
      const bottomSheet = $(".bottomSheet") as HTMLElement;
      ControlDom.showClose(bottomSheet, "bottomSheet--open");
    });
  },
};

export default InputFormOpenButton;
