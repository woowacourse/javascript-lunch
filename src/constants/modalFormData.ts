import { ModalFormConfig, ModalTitle } from "../../types/form.js";
import { SELECT_CATEGORY_MODAL, SELECT_DISTANCE } from "./constant.js";

export const MODAL_TITLE: ModalTitle = { type: "modal", text: "새로운 음식점" };

export const MODAL_FORM_CONFIG: ModalFormConfig = {
  fields: [
    {
      label: "카테고리",
      type: "select",
      name: "category",
      options: SELECT_CATEGORY_MODAL,
      defaultOption: "선택해주세요",
      required: true,
    },
    { label: "이름", type: "input", name: "name", inputType: "text", required: true },
    {
      label: "거리(도보 이동 시간)",
      type: "select",
      name: "distance",
      options: SELECT_DISTANCE,
      defaultOption: "선택해주세요",
      required: true,
    },
    { label: "설명", type: "textarea", name: "description", notice: "메뉴 등 추가 정보를 입력해 주세요." },
    {
      label: "참고 링크",
      type: "input",
      name: "link",
      inputType: "text",
      notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
    },
  ],
  buttons: [
    { type: "button", stylingBased: "secondary", text: "취소하기" },
    { type: "submit", stylingBased: "primary", text: "등록하기" },
  ],
};
