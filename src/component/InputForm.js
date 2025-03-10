import { DOM } from "../utils/dom.js";

const InputForm = {
  create({ id, label, isRequired, bottomDescription }) {
    const InputFormElement = document.createElement("div");
    InputFormElement.classList.add("form-item");
    if (isRequired) InputFormElement.classList.add("form-item--required");

    InputFormElement.innerHTML = `
                <label for="${id} text-caption">${label}</label>
                <input type="text" name=${id} id=${id}  ${
      isRequired ? "required" : ""
    }  />
                ${
                  bottomDescription === ""
                    ? ""
                    : `<span class='help-text text-caption'>${bottomDescription}</span>`
                }
    `;

    return InputFormElement;
  },
};

export default InputForm;
