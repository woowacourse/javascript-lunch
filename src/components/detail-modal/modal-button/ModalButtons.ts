import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import modalButtonTemplate from "./buttonTemplate";

function ModalButtons() {
  const modal = document.getElementsByClassName("detail-modal-container")[0];

  modal.appendChild(convertHTMLStringToDOM(modalButtonTemplate));

  //   submitHandler(modal);
  //   cancelHandler(modal);
}

export default ModalButtons;
