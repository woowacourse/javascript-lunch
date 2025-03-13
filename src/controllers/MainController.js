import Form from "../components/Form/Form.js";
import FormItemField from "../components/Form/FormItemField.js";
import InputField from "../components/Form/InputField.js";
import SelectField from "../components/Form/SelectField.js";
import TextareaField from "../components/Form/TextareaField.js";
import Title from "../components/Title.js";
import { MODAL_BUTTONS_PROPERTY, SELECT_CATEGORY, SELECT_DISTANCE } from "../contants.js";
import { formatCategory, formatDistance } from "../utils/format.js";
import HeaderController from "./HeaderController.js";
import ListController from "./ListController.js";
import ModalController from "./ModalController.js";

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
  {
    label: "이름",
    tag: "input",
    type: "text",
    name: "name",
    notice: "",
    required: true,
    values: "",
  },
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
    values: "",
  },
  {
    label: "참고 링크",
    tag: "input",
    type: "url",
    name: "link",
    required: false,
    notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    values: "",
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

function MainController() {
  const app = document.getElementById("app");
  const listContainerElement = document.querySelector(".restaurant-list-container");
  const titleElement = Title({ type: "modal", text: "새로운 음식점" });
  const formItems = createFormItems(INPUT_ITEMS);
  const formElement = Form({ formItems, buttons: MODAL_BUTTONS_PROPERTY });

  HeaderController(app);
  const { listElement, restaurantList } = ListController(listContainerElement);
  ModalController({ listElement, restaurantList, children: { titleElement, formElement } });
}

export default MainController;
