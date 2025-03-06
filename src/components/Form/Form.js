import { MODAL_BUTTONS_PROPERTY } from "../../contants.js";
import ButtonsForm from "./ButtonsForm.js";
import FormItem from "./FormItem.js";

function Form(formsProperty) {
  const formElement = document.createElement("form");

  formsProperty.forEach((formProperty) => {
    formElement.appendChild(FormItem(formProperty));
  });
  formElement.appendChild(ButtonsForm(MODAL_BUTTONS_PROPERTY));

  return formElement;
}

export default Form;
