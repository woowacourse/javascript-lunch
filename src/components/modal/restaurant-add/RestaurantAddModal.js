import createElement from "../../../util/createElement.js";
import Select from "../../common/Select.js";
import RestaurantAddModalItem from "./RestaurantAddModalItem.js";
import Input from "../../common/Input.js";
import TextArea from "../../common/TextArea.js";
import RestaurantAddModalButtonContainer from "./RestaurantAddModalButtonContainer.js";
import restaurantDataList from "../../../domain/RestaurantDataList.ts";
import { removeModal } from "../Modal.js";

const CATEGORY_OPTIONS = ["한식", "중식", "일식", "양식", "아시안", "기타"];
const DISTANCE_OPTIONS = ["5분 내", "10분 내", "15분 내", "20분 내", "30분 내"];

export default function RestaurantAddModal() {
  const $fragment = document.createDocumentFragment();
  const $h2 = createElement({
    tag: "h2",
    classNames: ["modal-title", "text-title"],
    textContent: "새로운 음식점",
  });
  const $form = createElement({
    tag: "form",
    classNames: ["restaurant-add-form"],
  });

  const formItems = createFormItems();

  $form.addEventListener("submit", createRestaurantItem);

  $form.append(...formItems);
  $form.appendChild(RestaurantAddModalButtonContainer());
  $fragment.appendChild($h2);
  $fragment.appendChild($form);

  return $fragment;
}

function createRestaurantItem(event) {
  try {
    event.preventDefault();

    const restaurantData = Object.fromEntries(new FormData(event.target));
    restaurantDataList.addData(restaurantData);
    restaurantDataList.renderRestaurantList();

    removeModal();
  } catch (e) {
    alert(e.message);
  }
}

function createFormItems() {
  return [
    {
      isRequired: true,
      name: "category",
      text: "카테고리",
      renderChild: () =>
        Select({
          name: "category",
          id: "category",
          options: CATEGORY_OPTIONS,
          isRequired: true,
        }),
    },
    {
      isRequired: true,
      name: "name",
      text: "이름",
      renderChild: () =>
        Input({ type: "text", name: "name", id: "name", isRequired: true }),
    },
    {
      isRequired: true,
      name: "distance",
      text: "거리(도보 이동 시간)",
      renderChild: () =>
        Select({
          name: "distance",
          id: "distance",
          options: DISTANCE_OPTIONS,
          values: ["5", "10", "15", "20", "30"],
          isRequired: true,
        }),
    },
    {
      isRequired: false,
      name: "description",
      text: "설명",
      renderChild: () =>
        TextArea({
          name: "description",
          id: "description",
          cols: "30",
          rows: "5",
        }),
      helpText: "메뉴 등 추가 정보를 입력해 주세요",
    },
    {
      isRequired: false,
      name: "link",
      text: "참고 링크",
      renderChild: () =>
        Input({ type: "text", name: "link", id: "link", isRequired: false }),
      helpText: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    },
  ].map((formItem) => {
    return RestaurantAddModalItem(formItem);
  });
}
