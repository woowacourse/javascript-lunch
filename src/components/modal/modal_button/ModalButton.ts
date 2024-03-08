import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import { cancelHandler, submitHandler } from "./handlers";
import modalButtonTemplate from "./modalButtonTemplate";

function ModalButton(modal: Element, form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(modalButtonTemplate));

    submitHandler(modal);
    cancelHandler(modal);
  };

  render();
}

export default ModalButton;
