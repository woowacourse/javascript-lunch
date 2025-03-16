import EventHandler from "../utils/EventHandler.js";

function ModalEventHandler({ modalElement, formElement }, updateCategorySortListView, restaurantList) {
  const closeButtonElement = formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");

  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement, formElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(modalElement, formElement));

  formElement.addEventListener("submit", (event) => {
    const values = EventHandler.formDataParsing(event);
    restaurantList.addRestaurant(values);
    updateCategorySortListView();
    EventHandler.modalToggle(modalElement, formElement);
  });
}

export default ModalEventHandler;
