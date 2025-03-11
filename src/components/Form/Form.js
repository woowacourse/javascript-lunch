import ButtonsField from "./ButtonsField.js";

function Form({ formItems = [], buttons = [] }) {
  const formElement = document.createElement("form");

  if (formItems.length > 0) {
    formItems.forEach((formItem) => {
      formElement.appendChild(formItem);
    });
  }
  if (buttons.length > 0) {
    formElement.appendChild(ButtonsField(buttons));
  }
  return formElement;
}

export default Form;
