import Button from "../components/Button.js";
import ButtonsForm from "../components/Form/ButtonsForm.js";
import Form from "../components/Form/Form.js";
import FormItem from "../components/Form/FormItem.js";
import InputForm from "../components/Form/InputForm.js";
import SelectForm from "../components/Form/SelectForm.js";
import TextareaForm from "../components/Form/TextareaForm.js";
import ListItem from "../components/ListItem.js";
import Modal from "../components/Modal.js";
import Title from "../components/Title.js";
import { MODAL_FORM_CONFIG, MODAL_TITLE } from "../constants/modalFormData.js";
import EventHandler from "./EventHandler.js";

export function ModalController(mainElement, { listElement, restaurantList }) {
  const titleElement = Title(MODAL_TITLE);
  const { formItems, buttonsFormItems } = generateFormItems(MODAL_FORM_CONFIG);
  const formElement = Form(formItems, buttonsFormItems);
  const modalElement = Modal([titleElement, formElement]);
  const closeButtonElement = formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");

  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, formElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, formElement));
  formElement.addEventListener("submit", (event) => {
    const values = EventHandler.formDataParsing(event);
    const restaurant = restaurantList.addRestaurant(values);
    listElement.appendChild(ListItem(restaurant.information));
    EventHandler.modalToggle(mainElement, formElement);
  });

  mainElement.appendChild(modalElement);
}

export default ModalController;

function generateFormItems(MODAL_FORM_CONFIG) {
  const { fields, buttons } = MODAL_FORM_CONFIG;

  const formItems = fields.map(({ notice, ...fieldData }) => {
    const fieldComponent = matchFieldComponent(fieldData);
    return FormItem({ ...fieldData, fieldComponent, notice });
  });

  const formButtons = buttons.map((buttonData) => Button(buttonData));

  return { formItems, buttonsFormItems: ButtonsForm(formButtons) };
}

function matchFieldComponent({ type, name, inputType, options, required }) {
  switch (type) {
    case "select":
      return SelectForm(name, options);
    case "input":
      return InputForm(inputType, name, required);
    case "textarea":
      return TextareaForm(name);
    default:
      console.error(`지원하지 않는 필드 타입입니다: "${type}"`);
  }
}
