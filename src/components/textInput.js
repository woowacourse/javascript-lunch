import RESTAURANT_ADD_FORM_INPUT_TITLE from "../constants/restaurantAddForm/inputTitle.js";

const TextInput = (name, isRequired, helpText) => {
  const formItem = document.createElement("div");
  formItem.classList.add("form-item");
  if (isRequired) formItem.classList.add("form-item--required");

  formItem.innerHTML = `
    <label for=${name} class="text-caption">${
    RESTAURANT_ADD_FORM_INPUT_TITLE[name.toUpperCase()]
  }</label>
    <input type="text" name=${name} id=${name} />
  `;

  if (helpText) {
    const span = document.createElement("span");
    span.classList.add("help-text");
    span.classList.add("text-caption");
    span.innerText = helpText;
    formItem.appendChild(span);
  }

  return formItem;
};

export default TextInput;
