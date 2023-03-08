import { $, BottomSheetForm } from "../until/ControlDom";
import addButtonImg from "../../templates/add-button.png";

const BottomSheetOpenButton = {
  template() {
    return `
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src=${addButtonImg} alt="음식점 추가">
      </button>`;
  },

  openBottomSheet() {
    const gnbButton = $(".gnb__button");

    gnbButton?.addEventListener("click", () => {
      BottomSheetForm.toggle();
    });
  },
};

export default BottomSheetOpenButton;
