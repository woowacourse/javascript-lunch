import { Irestaurant } from "../../../types/restaurant";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import detailModalButtonTemplate from "./detailModalButtonTemplate";
import { closeHandler, removeHandler } from "./handlers";

function ModalButtons(restaurant: Irestaurant) {
  const modal = document.getElementsByClassName("detail-modal")[0];
  const modalContainer = document.getElementsByClassName(
    "detail-modal-container",
  )[0];
  modalContainer.appendChild(convertHTMLStringToDOM(detailModalButtonTemplate));

  removeHandler(modal, restaurant);
  closeHandler(modal);
}

export default ModalButtons;
