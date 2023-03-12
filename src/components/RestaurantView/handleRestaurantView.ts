import { deleteRestaurant } from "../../domain/restaurant";
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
    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteRestaurant(id);
    }
  });
};
