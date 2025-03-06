import FormItem from "./components/Form/FormItem.js";
import InputForm from "./components/Form/InputForm.js";
import SelectForm from "./components/Form/SelectForm.js";
import Header from "./components/Header.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import { HEADER_CONTENTS, LIST_ITEM_CONTENTS } from "./contants.js";

function renderContents() {
  const app = document.getElementById("app");
  const listContainerElement = app.querySelector(".restaurant-list-container");
  const modalFormElement = app.querySelector(".modal form");
  const listElement = List(LIST_ITEM_CONTENTS);
  app.prepend(Header(HEADER_CONTENTS));
  listContainerElement.appendChild(listElement);
  modalFormElement.appendChild(FormItem("카테고리", () => SelectForm()));
  modalFormElement.appendChild(FormItem("이름", () => InputForm("text", "name", true)));
}

renderContents();
