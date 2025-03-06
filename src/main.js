import Button from "./components/Button.js";
import FormItem from "./components/Form/FormItem.js";
import InputForm from "./components/Form/InputForm.js";
import SelectForm from "./components/Form/SelectForm.js";
import TextareaForm from "./components/Form/TextareaForm.js";
import Header from "./components/Header.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import { HEADER_CONTENTS, LIST_ITEM_CONTENTS, SELECT_CATEGORY, SELECT_DISTANCE } from "./contants.js";

function renderContents() {
  const app = document.getElementById("app");
  const listContainerElement = app.querySelector(".restaurant-list-container");
  const modalFormElement = app.querySelector(".modal form");
  const listElement = List(LIST_ITEM_CONTENTS);
  app.prepend(Header(HEADER_CONTENTS));
  listContainerElement.appendChild(listElement);

  modalFormElement.appendChild(FormItem("카테고리", () => SelectForm(SELECT_CATEGORY)));
  modalFormElement.appendChild(FormItem("이름", () => InputForm("text", "name", true)));
  modalFormElement.appendChild(FormItem("거리(도보 이동 시간)", () => SelectForm(SELECT_DISTANCE)));
  modalFormElement.appendChild(
    FormItem("설명", () => TextareaForm("description"), "메뉴 등 추가 정보를 입력해 주세요."),
  );
  modalFormElement.appendChild(Button("button", "secondary", "취소하기"));
}

renderContents();
