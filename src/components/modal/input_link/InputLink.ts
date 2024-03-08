import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import { inputLinkHandler } from "./handlers";
import inputLinkTemplate from "./template";

function InputLink(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(inputLinkTemplate));

    inputLinkHandler();
  };

  render();
}

export default InputLink;
