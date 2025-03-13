export const SELECT_CATEGORY = ["한식", "중식", "일식", "양식", "아시안", "기타"];

export const SELECT_DISTANCE = ["5분 내", "10분 내", "15분 내", "20분 내", "30분 내"];

export const MODAL_TITLE = { type: "modal", text: "새로운 음식점" };

export const MODAL_FORM_CONFIG = {
  fields: [
    { label: "카테고리", type: "select", name: "category", options: SELECT_CATEGORY, required: true },
    { label: "이름", type: "input", name: "name", inputType: "text", required: true },
    { label: "거리(도보 이동 시간)", type: "select", name: "distance", options: SELECT_DISTANCE, required: true },
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
