import Header from "../components/Header.js";
import { HEADER_CONTENTS } from "../contants.js";

export function HeaderController(app) {
  app.prepend(Header(HEADER_CONTENTS));

  app.querySelector("header button.gnb__button").addEventListener("click", (event) => {
    app.querySelector(".modal").classList.add("modal--open");
  });
}

export default HeaderController;
