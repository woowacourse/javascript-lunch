import { closeBottomSheet } from "../BottomSheet/handleBottomSheet";

export const onClickCancelButton = () => {
  const cancelButton = document.getElementById("cancelButton");
  cancelButton?.addEventListener("click", () => {
    closeBottomSheet();
  });
};

export const onClickDeleteButton = (id: string) => {
  const deleteButton = document.getElementById("deleteButton");
  deleteButton?.addEventListener("click", () => {
    console.log(id + "삭제를 시도합니다.");
  });
};
