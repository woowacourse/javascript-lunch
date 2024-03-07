import { inputDescriptionTemplate } from "./template";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import { descriptionEventHandler } from "./handlers";

function InputDescription(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));

    inputDescriptionHandler();
  };

  const inputDescriptionHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const description = document.getElementById("description");

      if (description) {
        descriptionEventHandler(description);
      }
    });
  };

  render();
}

export default InputDescription;
