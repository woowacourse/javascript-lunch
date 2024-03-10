import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import modalTemplate from "./modalTemplate";
import renderModalContent from "./renderHandlers";

function Modal() {
  document.body.appendChild(convertHTMLStringToDOM(modalTemplate));

  renderModalContent();
}

export default Modal;
