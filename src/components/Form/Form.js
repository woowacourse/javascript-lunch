function Form(formItems, buttonsFormItems) {
  const formElement = document.createElement("form");

  formItems.forEach((formItem) => {
    formElement.appendChild(formItem);
  });
  formElement.appendChild(buttonsFormItems);

  return formElement;
}

export default Form;
