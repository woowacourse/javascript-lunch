import { DOM } from "./utils/dom.js";
import IconButton from "./component/IconButton.js";
import AddLunchModal from "./component/AddLunchModal.js";
import TextButton from "./component/TextButton.js";
import LunchInfoCard from "./component/LunchInfoCard.js";
import SelectForm from "./component/SelectForm.js";
import TextareaForm from "./component/TextareaForm.js";
import InputForm from "./component/InputForm.js";
import Header from "./component/Header.js";
import render from "./utils/render.js";
import state from "./state.js";

DOM.$body.prepend(Header.create());

renderRestaurantList();

render(
  SelectForm.create({
    id: "category",
    label: "카테고리",
    dropdownList: [
      {
        value: "",
        label: "선택해 주세요",
      },
      {
        value: "한식",
        label: "한식",
      },
      {
        value: "중식",
        label: "중식",
      },
      {
        value: "일식",
        label: "일식",
      },
      {
        value: "양식",
        label: "양식",
      },
      {
        value: "아시안",
        label: "아시안",
      },
      {
        value: "기타",
        label: "기타",
      },
    ],
    isRequired: true,
  }),
  DOM.$modalForm
);

render(
  InputForm.create({
    id: "name",
    label: "이름",
    isRequired: true,
    bottomDescription: "",
  }),
  DOM.$modalForm
);

render(
  SelectForm.create({
    id: "distance",
    label: "거리(도보 이동 시간)",
    dropdownList: [
      {
        value: "",
        label: "선택해 주세요",
      },
      {
        value: "5",
        label: "5분 내",
      },
      {
        value: "10",
        label: "10분 내",
      },
      {
        value: "15",
        label: "15분 내",
      },
      {
        value: "20",
        label: "20분 내",
      },
      {
        value: "30",
        label: "30분 내",
      },
    ],
    isRequired: true,
  }),
  DOM.$modalForm
);

render(
  TextareaForm.create({
    id: "description",
    bottomDescription: "메뉴 등 추가 정보를 입력해 주세요.",
    rows: "5",
    label: "설명",
    isRequired: false,
  }),
  DOM.$modalForm
);

render(
  InputForm.create({
    id: "link",
    label: "참고 링크",
    isRequired: false,
    bottomDescription: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
  }),
  DOM.$modalForm
);

render(
  TextButton.create({
    id: "cancel__button",
    title: "취소하기",
    onClick: () => AddLunchModal.close(),
  }),
  DOM.$buttonContainer
);

render(
  TextButton.create({
    id: "add__button",
    title: "추가하기",
    onClick: () => console.log("미구현"),
  }),
  DOM.$buttonContainer
);

function renderRestaurantList() {
  state.restaurantList.forEach(
    ({ src, name, distance, description, label }) => {
      render(
        LunchInfoCard.create({ src, name, distance, description, label }),
        DOM.$restaurantList
      );
    }
  );
}
