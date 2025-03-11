import Modal from "../components/Modal.js";
import { convertObjectToArray } from "../utils/format.js";
import EventHandler from "./EventHandler.js";

export function ModalController({ listElement, restaurantList, children }) {
  const mainElement = app.querySelector("main");
  const modalElement = Modal(convertObjectToArray(children));
  const closeButtonElement = children.formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");

  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, children.formElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, children.formElement));
  children.formElement.addEventListener("submit", (event) => {
    const values = EventHandler.formDataParsing(event);
    const restaurant = restaurantList.addRestaurant(values);
    listElement.appendChild(ListItem(restaurant.information));
    EventHandler.modalToggle(mainElement, children.formElement);
  });

  mainElement.appendChild(modalElement);
}

export default ModalController;
