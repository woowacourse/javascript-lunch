import { DOM } from "../utils/dom.js";

const TextareaForm = {
  create({ id, bottomDescription, rows, label, isRequired }) {
    const TextareaFormElement = document.createElement("div");
    TextareaFormElement.setAttribute("class", "form-item");
    if (isRequired) TextareaFormElement.classList.add("form-item--required");

    TextareaFormElement.innerHTML = `
                <label for="${id} text-caption" >${label}</label>
                <Textarea
                  name=${id}
                  id=${id}
                  cols="30"
                  rows=${rows}
                  ${isRequired ? "required" : ""}
                ></Textarea>
                <span class="help-text text-caption"
                  >${bottomDescription}</span
                >
                `;

    return TextareaFormElement;
  },
};

export default TextareaForm;
