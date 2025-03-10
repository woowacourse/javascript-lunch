import { MODAL_BUTTONS_PROPERTY } from "../../contants.js";
import ButtonsField from "./ButtonsField.js";
import FormItemField from "./FormItemField.js";

function Form(formsProperty) {
  const formElement = document.createElement("form");

  formsProperty.forEach((formProperty) => {
    formElement.appendChild(FormItemField(formProperty));
  });
  formElement.appendChild(ButtonsField(MODAL_BUTTONS_PROPERTY));

  return formElement;
}

export default Form;
