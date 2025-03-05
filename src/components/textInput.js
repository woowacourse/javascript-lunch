import { title } from "../constants/inputTitle.js";

const textInput = (name, isRequired, helpText) => {
  const formItem = document.createElement("div");
  formItem.classList.add("form-item");
  if (isRequired) formItem.classList.add("form-item--required");

  formItem.innerHTML = `
                <label for="${name} text-caption">${title[name]}</label>
                <input type="text" name="${name}" id="${name}" ${
    isRequired && "required"
  } />
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

export default textInput;
