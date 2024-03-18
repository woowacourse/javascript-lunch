import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import linkEventHandler from "./handlers";
import inputLinkTemplate from "./inputLinkTemplate";

function InputLink(form: Element) {
  form.appendChild(convertHTMLStringToDOM(inputLinkTemplate));

  linkEventHandler();
}

export default InputLink;
