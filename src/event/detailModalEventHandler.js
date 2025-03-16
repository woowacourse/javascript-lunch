import EventHandler from "../utils/EventHandler.js";

function DetailModalEventHandler({
  modalElement,
  restaurantList,
  restaurantName,
  updateCategorySortListView,
  updateFavoriteListView,
}) {
  const deleteButtonElement = modalElement.querySelector("button[type='submit']");
  const closeButtonElement = modalElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");

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
