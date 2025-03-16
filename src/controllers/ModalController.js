import Modal from "../components/Modal.js";
import Title from "../components/Title.js";
import { MODAL_FORM_CONFIG, MODAL_TITLE } from "../constants/modalFormData.js";
import { generateFormItems } from "../utils/formUtils.js";
import EventHandler from "../utils/EventHandler.js";
import Form from "../components/Form/Form.js";

export function ModalController(mainElement, { updateListView, restaurantList }) {
  const titleElement = Title(MODAL_TITLE);
  const { formItems, buttonsFormItems } = generateFormItems(MODAL_FORM_CONFIG);
  const formElement = Form(formItems, buttonsFormItems);
  const modalElement = Modal([titleElement, formElement]);
  const closeButtonElement = formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");

  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement, formElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(modalElement, formElement));
  formElement.addEventListener("submit", (event) => {
    const values = EventHandler.formDataParsing(event);
    restaurantList.addRestaurant(values);
    // List 재렌더링
    updateListView();
    EventHandler.modalToggle(modalElement, formElement);
  });

  mainElement.appendChild(modalElement);

  return modalElement;
}

export default ModalController;
