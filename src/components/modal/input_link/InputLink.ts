import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import { inputLinkHandler } from "./handlers";
import inputLinkTemplate from "./inputLinkTemplate";

function InputLink(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(inputLinkTemplate));

    inputLinkHandler();
  };

  render();
}

export default InputLink;
