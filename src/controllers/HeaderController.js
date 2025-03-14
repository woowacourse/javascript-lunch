import Header from "../components/Header.js";
import { HEADER_CONTENTS } from "../constants/listData.js";
import EventHandler from "../utils/EventHandler.js";

export function HeaderController(app, modalElement) {
  app.prepend(Header(HEADER_CONTENTS));
  const modalButtonElement = app.querySelector("header button.gnb__button");
  modalButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
}

export default HeaderController;
