import { inputNameTemplate } from "./template";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import { inputNameHandler } from "./handlers";

function InputName(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(inputNameTemplate));

    inputNameHandler();
  };

  render();
}

export default InputName;
