import $select from "../components/common/select";
import $input from "../components/common/input";
import $textarea from "../components/common/textarea";
import $createRestaurantList from "../components/restaurant/restaurantItemList";
import {
  categoryOptions,
  distanceOptions,
  categoryFilterOptions,
  sortingFilterOptions,
} from "./selectOptions";
import { validateRestaurantForm } from "../validation/validationForm";
import { TypeInput, TypeSelect, TypeTextarea } from "../types/types";

const senseChangeRestaurantFormValue = () => {
  try {
    const form = document.getElementById(
      "add-restaurant-form"
    ) as HTMLFormElement;

    validateRestaurantForm(form);

    const submitButton = document.getElementById(
      "addRestaurantButton"
    ) as HTMLButtonElement;
    submitButton?.classList.remove("button--disabled");
    submitButton.disabled = false;
  } catch (error) {
    const submitButton = document.getElementById(
      "addRestaurantButton"
    ) as HTMLButtonElement;
    submitButton?.classList.add("button--disabled");
    submitButton.disabled = true;
  }
};

export const FORM_FIELDS: any = {
  INPUTS: {
    name: {
      label: "이름",
      eventType: "input",
      event: senseChangeRestaurantFormValue,
      attribute: {
        required: true,
        id: "name",
        name: "name",
        type: "text",
        maxlength: 30,
        placeholder: "음식점 이름을 입력해주세요.",
      },
    },
    link: {
      label: "참고 링크",
      eventType: "input",
      event: senseChangeRestaurantFormValue,
      attribute: {
        id: "link",
        name: "link",
        type: "text",
        maxlength: 100,
        placeholder: "https://www.woowacourse.io/",
      },
    },
    create: (info: TypeInput) => $input(info),
  },
  SELECTS: {
    category: {
      label: "카테고리",
      options: categoryOptions,
      eventType: "change",
      event: senseChangeRestaurantFormValue,
      attribute: {
        required: true,
        id: "category",
        name: "category",
      },
    },
    distance: {
      label: "거리(도보 이동 시간)",
      options: distanceOptions,
      eventType: "change",
      event: senseChangeRestaurantFormValue,
      attribute: {
        required: true,
        id: "distance",
        name: "distance",
      },
    },
    categoryFilter: {
      options: categoryFilterOptions,
      eventType: "change",
      event: $createRestaurantList,
      attribute: {
        id: "category-filter",
        name: "restaurant-filter",
      },
    },
    sortingFilter: {
      options: sortingFilterOptions,
      eventType: "change",
      event: $createRestaurantList,
      attribute: {
        id: "sorting-filter",
        name: "restaurant-filter",
      },
    },
    create: (info: TypeSelect) => $select(info),
  },
  TEXTAREAS: {
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
    create: (info: TypeTextarea) => $textarea(info),
  },
} as const;
