import Header from "../components/Header.js";
import { HEADER_CONTENTS } from "../contants.js";
import { openRestaurantModal } from "./ModalController.js";

export function HeaderController(app, listContainerElement) {
  app.appendChild(Header(HEADER_CONTENTS));
  const modalButtonElement = app.querySelector("header button.gnb__button");

  modalButtonElement.addEventListener("click", () => {
    openRestaurantModal(app, listContainerElement);
  });
}

export default HeaderController;
