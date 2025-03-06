import Button from "./components/Button.js";
import ButtonsForm from "./components/Form/ButtonsForm.js";
import Form from "./components/Form/Form.js";
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

const MODAL_FORM = [
  { label: "카테고리", formComponent: () => SelectForm(SELECT_CATEGORY) },
  { label: "이름", formComponent: () => InputForm("text", "name", true) },
  { label: "거리(도보 이동 시간)", formComponent: () => SelectForm(SELECT_DISTANCE) },
  { label: "설명", formComponent: () => TextareaForm("description"), notice: "메뉴 등 추가 정보를 입력해 주세요." },
  {
    label: "참고 링크",
    formComponent: () => InputForm("text", "link"),
    notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
  },
];

function renderContents() {
  const app = document.getElementById("app");
  const listContainerElement = app.querySelector(".restaurant-list-container");
  const modalContainer = app.querySelector(".modal-container");
  const listElement = List(LIST_ITEM_CONTENTS);

  app.prepend(Header(HEADER_CONTENTS));
  listContainerElement.appendChild(listElement);

  modalContainer.appendChild(Form(MODAL_FORM));
}

renderContents();
