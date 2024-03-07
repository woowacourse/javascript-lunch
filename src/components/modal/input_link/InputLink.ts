import { inputLinkTemplate } from "./template";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import { inputLinkHandler } from "./handlers";

function InputLink(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(inputLinkTemplate));

    inputLinkHandler();
  };

  render();
}

export default InputLink;
