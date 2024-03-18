import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import descriptionEventHandler from "./handlers";
import inputDescriptionTemplate from "./inputDescriptionTemplate";

function InputDescription(form: Element) {
  form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));

  descriptionEventHandler();
}

export default InputDescription;
