import { title } from "../constants/inputTitle.js";
import createElement from "../utils/createElement.js";

const TextInput = (name, isRequired, helpText) => {
  const formItem = createElement({ tag: "div", classList: ["form-item"] });

  if (isRequired) formItem.classList.add("form-item--required");

  formItem.innerHTML = `
                <label for="${name}">${title[name]}</label>
                <input type="text" name="${name}" id="${name}" />
  `;

  if (helpText) {
    const span = createElement({
      tag: "span",
      classList: ["help-text", "text-caption"],
    });
    span.innerText = helpText;
    formItem.appendChild(span);
  }

  return formItem;
};

export default TextInput;
