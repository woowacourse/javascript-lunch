import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import nameEventHandler from "./handlers";
import inputNameTemplate from "./inputNameTemplate";

function InputName(form: Element) {
  form.appendChild(convertHTMLStringToDOM(inputNameTemplate));

  nameEventHandler();
}

export default InputName;
