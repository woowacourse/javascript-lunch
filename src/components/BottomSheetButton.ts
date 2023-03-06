// import addButton from "../../templates/add-button.png";

import { $, BottomSheet } from "../until/ControlDom";

const BottomSheetButton = {
  setEvent() {
    const gnbButton = $(".gnb__button");
    gnbButton?.addEventListener("click", () => {
      BottomSheet.toggle();
    });
  },
};

export default BottomSheetButton;
