import { detailModalEventHandlerType } from "../../types/detailModal.js";
import EventHandler from "../utils/EventHandler.js";

function DetailModalEventHandler({
  modalElement,
  restaurantList,
  restaurantName,
  updateCategorySortListView,
  updateFavoriteListView,
}: detailModalEventHandlerType) {
  const deleteButtonElement = modalElement.querySelector("button[type='submit']") as HTMLButtonElement;
  const closeButtonElement = modalElement.querySelector("button[type='button']") as HTMLButtonElement;
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop") as HTMLDivElement;

  deleteButtonElement.addEventListener("click", () => {
    restaurantList.removeRestaurant(restaurantName); // 도메인 업데이트
    updateCategorySortListView(); // 돔 업데이트
    updateFavoriteListView(); // 돔 업데이트
    EventHandler.modalToggle(modalElement);
  });

  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
}

export default DetailModalEventHandler;
