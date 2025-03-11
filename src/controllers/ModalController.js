import Form from "../components/Form/Form.js";
import FormItemField from "../components/Form/FormItemField.js";
import InputField from "../components/Form/InputField.js";
import SelectField from "../components/Form/SelectField.js";
import TextareaField from "../components/Form/TextareaField.js";
import ListItem from "../components/ListItem.js";
import Modal from "../components/Modal.js";
import Title from "../components/Title.js";
import { MODAL_BUTTONS_PROPERTY, SELECT_CATEGORY, SELECT_DISTANCE } from "../contants.js";
import { formatCategory, formatDistance } from "../utils/format.js";
import EventHandler from "./EventHandler.js";

const INPUT_ITEMS = [
  {
    label: "카테고리",
    tag: "select",
    type: "select",
    name: "category",
    required: true,
    notice: "",
    values: formatCategory(SELECT_CATEGORY),
  },
  { label: "이름", tag: "input", type: "text", name: "name", notice: "", required: true },
  {
    label: "거리(도보 이동 시간)",
    tag: "select",
    type: "select",
    name: "distance",
    required: true,
    values: formatDistance(SELECT_DISTANCE),
  },
  {
    label: "설명",
    tag: "textarea",
    type: "textarea",
    name: "description",
    required: false,
    notice: "메뉴 등 추가 정보를 입력해 주세요.",
  },
  {
    label: "참고 링크",
    tag: "input",
    type: "url",
    name: "link",
    required: false,
    notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
  },
];

export function createFormItems(inputItems) {
  const formItems = inputItems.map((item) => {
    if (item.tag === "select") {
      const component = SelectField(item);
      return FormItemField({ item, component });
    }
    if (item.tag === "input") {
      const component = InputField(item);
      return FormItemField({ item, component });
    }
    if (item.tag === "textarea") {
      const component = TextareaField(item);
      return FormItemField({ item, component });
    }
  });
  return formItems;
}

export function ModalController(mainElement, { listElement, restaurantList }) {
  const titleElement = Title({ type: "modal", text: "새로운 음식점" });
  const formItems = createFormItems(INPUT_ITEMS);
  const formElement = Form({ formItems, buttons: MODAL_BUTTONS_PROPERTY });
  const modalElement = Modal([titleElement, formElement]);
  const closeButtonElement = formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");

  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, formElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, formElement));
  formElement.addEventListener("submit", (event) => {
    const values = EventHandler.formDataParsing(event);
    const restaurant = restaurantList.addRestaurant(values);
    listElement.appendChild(ListItem(restaurant.information));
    EventHandler.modalToggle(mainElement, formElement);
  });

  mainElement.appendChild(modalElement);
}

export default ModalController;
