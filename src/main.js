import Header from "./components/Header.js";
import List from "./components/List.js";
import ListItem from "./components/ListItem.js";
import { HEADER_CONTENTS, LIST_ITEM_CONTENTS } from "./contants.js";

function SelectForm() {
  const selectElement = document.createElement("select");
  selectElement.id = "category";
  selectElement.name = "category";
  selectElement.required = true;

  selectElement.innerHTML = `
      <option value="">선택해 주세요</option>
      <option value="한식">한식</option>
      <option value="중식">중식</option>
      <option value="일식">일식</option>
      <option value="양식">양식</option>
      <option value="아시안">아시안</option>
      <option value="기타">기타</option>
  `;

  return selectElement;
}

function FormItem() {
  const formItemElement = document.createElement("div");

  formItemElement.className = "form-item form-item--required";
  formItemElement.innerHTML = `<label for="category text-caption">카테고리</label>`;
  formItemElement.appendChild(SelectForm());
  return formItemElement;
}

function renderContents() {
  const app = document.getElementById("app");
  const listContainerElement = app.querySelector(".restaurant-list-container");
  const modalFormElement = app.querySelector(".modal form");
  const listElement = List(LIST_ITEM_CONTENTS);
  app.prepend(Header(HEADER_CONTENTS));
  listContainerElement.appendChild(listElement);
  modalFormElement.prepend(FormItem());
}

renderContents();
