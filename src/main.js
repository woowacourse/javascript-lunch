import Button from "./components/Button.js";
import ButtonsForm from "./components/Form/ButtonsForm.js";
import FormItem from "./components/Form/FormItem.js";
import InputForm from "./components/Form/InputForm.js";
import SelectForm from "./components/Form/SelectForm.js";
import TextareaForm from "./components/Form/TextareaForm.js";
import Header from "./components/Header.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import {
  HEADER_CONTENTS,
  LIST_ITEM_CONTENTS,
  MODAL_BUTTONS_PROPERTY,
  SELECT_CATEGORY,
  SELECT_DISTANCE,
} from "./contants.js";

function Form() {
  const formElement = document.createElement("form");

  formElement.appendChild(FormItem("카테고리", () => SelectForm(SELECT_CATEGORY)));
  formElement.appendChild(FormItem("이름", () => InputForm("text", "name", true)));
  formElement.appendChild(FormItem("거리(도보 이동 시간)", () => SelectForm(SELECT_DISTANCE)));
  formElement.appendChild(FormItem("설명", () => TextareaForm("description"), "메뉴 등 추가 정보를 입력해 주세요."));
  formElement.appendChild(
    FormItem("참고 링크", () => InputForm("text", "link"), "매장 정보를 확인할 수 있는 링크를 입력해 주세요."),
  );
  formElement.appendChild(ButtonsForm(MODAL_BUTTONS_PROPERTY));

  return formElement;
}

function renderContents() {
  const app = document.getElementById("app");
  const listContainerElement = app.querySelector(".restaurant-list-container");
  const modalContainer = app.querySelector(".modal-container");
  const listElement = List(LIST_ITEM_CONTENTS);

  app.prepend(Header(HEADER_CONTENTS));
  listContainerElement.appendChild(listElement);

  modalContainer.appendChild(Form());
}

renderContents();
