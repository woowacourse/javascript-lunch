import { DOM } from "../../utils/dom.js";

const TextareaForm = {
  render(props, dom) {
    const TextareaFormElement = createTextareaForm(props);
    dom.append(TextareaFormElement);
  },
};

function createTextareaForm({ bottomDescription, rows, label, isRequired }) {
  const TextareaFormElement = document.createElement("div");
  TextareaFormElement.setAttribute("class", "form-item");
  if (isRequired) TextareaFormElement.classList.add("form-item--required");

  TextareaFormElement.innerHTML = `
              <label for="description text-caption" >${label}</label>
              <Textarea
                name="description"
                id="description"
                cols="30"
                rows=${rows}
                ${isRequired ? "required" : ""}
              ></Textarea>
              <span class="help-text text-caption"
                >${bottomDescription}</span
              >
              `;

  return TextareaFormElement;
}

export default TextareaForm;
