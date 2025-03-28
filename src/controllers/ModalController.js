import Form from "../components/Form/Form.js";
import { restaurantItemClick } from "../components/List.js";
import ListItem from "../components/ListItem.js";
import Modal from "../components/Modal.js";
import Title from "../components/Title.js";
import { MODAL_BUTTONS_PROPERTY } from "../contants.js";
import RestaurantList from "../domain/RestaurantList.ts";
import { convertObjectToArray } from "../utils/format.js";
import EventHandler from "./EventHandler.js";
import ListController from "./ListController.js";
import { createFormItems, INPUT_ITEMS } from "./MainController.js";

export function getModalContent() {
  const titleElement = Title({ type: "modal", text: "새로운 음식점" });
  const formItems = createFormItems(INPUT_ITEMS);
  const formElement = Form({ formItems, buttons: MODAL_BUTTONS_PROPERTY });
  return { titleElement, formElement };
}

export function getModalHandlers({ restaurantList, listElement, mainElement, formElement }) {
  const handleSubmit = (event) => {
    const values = EventHandler.formDataParsing(event);
    const restaurant = restaurantList.addRestaurant(values);
    listElement.appendChild(
      ListItem(restaurant.information, {
        onClick: (event) => restaurantItemClick(event, restaurantList),
      }),
    );
    EventHandler.modalToggle(mainElement, formElement);
  };

  const handleCancel = () => {
    EventHandler.modalToggle(mainElement, formElement);
  };

  return { handleSubmit, handleCancel };
}

export function openRestaurantModal(app, listContainerElement) {
  const mainElement = app.querySelector("main");
  const { titleElement, formElement } = getModalContent();
  const existingModal = document.querySelector(".modal");

  if (existingModal) {
    existingModal.remove();
  }

  const { listElement, restaurantList } = ListController(app, listContainerElement);
  const { handleSubmit, handleCancel } = getModalHandlers({ restaurantList, listElement, mainElement, formElement });

  ModalController({
    children: { titleElement, formElement },
    submit: handleSubmit,
    cancel: handleCancel,
  });

  EventHandler.modalToggle(app);
}

export function ModalController({ children, submit = null, cancel = null }) {
  const mainElement = app.querySelector("main");
  const modalElement = Modal(convertObjectToArray(children));
  const closeButtonElement = children.formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");
  const favoriteElement = document.querySelector(".favorites-icon");

  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, children.formElement));
  closeButtonElement.addEventListener("click", () => cancel());
  children.formElement.addEventListener("submit", (event) => submit(event));

  mainElement.appendChild(modalElement);
}

export default ModalController;
