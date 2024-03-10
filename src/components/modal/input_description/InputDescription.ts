import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import inputDescriptionHandler from "./handlers";
import inputDescriptionTemplate from "./inputDescriptionTemplate";

function InputDescription(form: Element) {
  form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));

  inputDescriptionHandler();
}

export default InputDescription;
