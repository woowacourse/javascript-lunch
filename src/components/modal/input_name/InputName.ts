import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import inputNameHandler from "./handlers";
import inputNameTemplate from "./inputNameTemplate";

function InputName(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(inputNameTemplate));

    inputNameHandler();
  };

  render();
}

export default InputName;
