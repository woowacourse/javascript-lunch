import Header from "./components/Header.js";
import { HEADER_CONTENTS } from "./contants.js";

function renderContents() {
  const app = document.getElementById("app");

  app.prepend(Header(HEADER_CONTENTS));
}

renderContents();
