import { UIConfigType } from "../types/uiConfigType";

export const UI_CONFIG: UIConfigType = {
  HEADER: {
    title: "점심 뭐 먹지",
    buttonTitle: "음식점 추가",
    buttonImage: "images/add-button.png",
  },
  TABS: {
    ALL: {
      text: "모든 음식점",
      attribute: {
        type: "button",
        id: "all",
        className: "button button--secondary select-tab-active",
      },
    },
    FAVORITE: {
      text: "자주 가는 음식점",
      attribute: {
        type: "button",
        id: "favorite",
        className: "button button--secondary",
      },
    },
  },
  BUTTONS: {
    CANCEL: {
      text: "취소하기",
      attribute: {
        type: "button",
        className: "button button--secondary text-caption cancel-button",
      },
    },
    ADD: {
      text: "추가하기",
      attribute: {
        id: "addRestaurantButton",
        type: "submit",
        disabled: true,
        className:
          "button button--primary text-caption add-button button--disabled",
      },
    },
    DELETE: {
      text: "삭제하기",
      attribute: {
        id: "deleteRestaurantButton",
        type: "button",
        className: "button button--secondary text-caption cancel-button",
      },
    },
    CLOSE: {
      text: "닫기",
      attribute: {
        id: "closeModalButton",
        type: "button",
        className: "button button--primary text-caption add-button",
      },
    },
  },
} as const;
