import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import descriptionEventHandler from "./handlers";
import inputDescriptionTemplate from "./template";

const inputDescriptionHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const description = document.getElementById("description");

    if (description) {
      descriptionEventHandler(description);
    }
  });
};

function InputDescription(form: Element) {
  form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));

  inputDescriptionHandler();
}

export default InputDescription;
