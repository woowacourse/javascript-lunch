import Header from "../components/Header.js";
import { HEADER_CONTENTS } from "../contants.js";
import EventHandler from "./EventHandler.js";

export function HeaderController(app) {
  const modalButtonElement = app.querySelector("header button.gnb__button");
  app.prepend(Header(HEADER_CONTENTS));
  modalButtonElement.addEventListener("click", () => EventHandler.modalToggle(app));
}

export default HeaderController;
