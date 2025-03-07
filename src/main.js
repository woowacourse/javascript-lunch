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
import Title from "./components/Title.js";
import {
  HEADER_CONTENTS,
  LIST_ITEM_CONTENTS,
  MODAL_BUTTONS_PROPERTY,
  SELECT_CATEGORY,
  SELECT_DISTANCE,
} from "./contants.js";
import RestaurantList from "./domain/RestaurantList.js";

const MODAL_FORM = [
  { label: "카테고리", formComponent: () => SelectForm("category", SELECT_CATEGORY) },
  { label: "이름", formComponent: () => InputForm("text", "name", true) },
  { label: "거리(도보 이동 시간)", formComponent: () => SelectForm("distance", SELECT_DISTANCE) },
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

  const restaurantList = new RestaurantList(LIST_ITEM_CONTENTS);

  const listElement = List(restaurantList.resaurants);

  app.prepend(Header(HEADER_CONTENTS));

  app.querySelector("header button.gnb__button").addEventListener("click", (event) => {
    app.querySelector(".modal").classList.add("modal--open");
  });

  listContainerElement.appendChild(listElement);

  const formElement = Form(MODAL_FORM);

  formElement.querySelector("button[type='button']").addEventListener("click", (event) => {
    formElement.reset();

    // 모달 내려주기
    app.querySelector(".modal").classList.remove("modal--open");
  });

  // 가게 추가
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    const restaurant = restaurantList.addRestaurant(values);

    listElement.appendChild(ListItem(restaurant.information));
    app.querySelector(".modal").classList.remove("modal--open");
    formElement.reset();
  });

  modalContainer.appendChild(Title({ type: "modal", text: "새로운 음식점" }));

  modalContainer.appendChild(formElement);
}

renderContents();
