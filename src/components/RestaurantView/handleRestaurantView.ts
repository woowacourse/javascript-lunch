import { closeBottomSheet } from "../BottomSheet/handleBottomSheet";

export const onClickCancelButton = () => {
  const cancelButton = document.getElementById("cancelButton");
  cancelButton?.addEventListener("click", () => {
    closeBottomSheet();
  });
};
