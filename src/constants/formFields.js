import $select from "../components/select.js";
import $input from "../components/input.js";
import $textarea from "../components/textarea.js";
import { categoryOptions, distanceOptions } from "../data/selectOptions.js";

export const FORM_FIELDS = Object.freeze({
  INPUTS: Object.freeze({
    name: {
      label: "이름",
      attribute: {
        required: true,
        id: "name",
        name: "name",
        type: "text",
        maxlength: 30,
        placeholder: "음식점 이름을 입력해주세요."
      },
    },
    link: {
      label: "참고 링크",
      attribute: {
        id: "link",
        name: "link",
        type: "text",
        maxlength: 100,
        placeholder: "https://www.woowacourse.io/",
      }
    },
    create: (info) => $input(info),
  }),
  SELECTS: Object.freeze({
    category: {
      label: "카테고리",
      options: categoryOptions,
      attribute: {
        required: true,
        id: "category",
        name: "category",
      },
    },
    distance: {
      label: "거리(도보 이동 시간)",
      options: distanceOptions,
      attribute: {
        required: true,
        id: "distance",
        name: "distance",
      }
    },
    create: (info) => $select(info),
  }),
  TEXTAREAS: Object.freeze({
    description: {
      label: "설명",
      helperText: "메뉴 등 추가 정보를 입력해 주세요.",
      attribute: {
        id: "description",
        name: "description",
        cols: "30",
        rows: "5",
        maxlength: 200,
        placeholder: "너무 맛있는데 너무 매워서 배가 아파요,,,",
      },
    },
    create: (info) => $textarea(info),
  }),
});
