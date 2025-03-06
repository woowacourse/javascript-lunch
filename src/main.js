import Header from "./components/Header.js";
import ListItem from "./components/ListItem.js";
import { HEADER_CONTENTS, LIST_ITEM_CONTENTS } from "./contants.js";

function renderContents() {
  const app = document.getElementById("app");
  const ulElement = app.querySelector(".restaurant-list");

  app.prepend(Header(HEADER_CONTENTS));
  ulElement.appendChild(ListItem(LIST_ITEM_CONTENTS[0]));
}

renderContents();
