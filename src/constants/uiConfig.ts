type HeaderConfig = {
  title: string;
  buttonTitle: string;
  buttonImage: string;
};

type ButtonConfig = {
  id: string;
  text: string;
  type: "button" | "submit";
  className: string[];
};

type ImageButtonConfig = {
  isFavorite: boolean;
  className: string[];
};

type UIConfig = {
  HEADER: HeaderConfig;
  BUTTONS: {
    CANCEL: ButtonConfig;
    ADD: ButtonConfig;
    DELETE: ButtonConfig;
    CLOSE: ButtonConfig;
    FAVORITE: ImageButtonConfig;
  };
};

export const UI_CONFIG: Readonly<UIConfig> = Object.freeze({
  HEADER: Object.freeze({
    title: "점심 뭐 먹지",
    buttonTitle: "음식점 추가",
    buttonImage: "images/add-button.png",
  }),
  BUTTONS: Object.freeze({
    CANCEL: {
      id: "cancel-restaurant-add-button",
      text: "취소하기",
      type: "button" as const,
      className: [
        "button",
        "button--secondary",
        "text-caption",
        "cancel-button",
      ],
    },
    ADD: {
      id: "restaurant-add-button",
      text: "추가하기",
      type: "submit" as const,
      className: ["button", "button--primary", "text-caption", "add-button"],
    },
    DELETE: {
      id: "delete-restaurant-button",
      text: "삭제하기",
      type: "button" as const,
      className: [
        "button",
        "button--secondary",
        "text-caption",
        "cancel-button",
      ],
    },
    CLOSE: {
      id: "close-restaurant-detail-button",
      text: "닫기",
      type: "button" as const,
      className: ["button", "button--primary", "text-caption", "add-button"],
    },
    FAVORITE: {
      isFavorite: false,
      className: ["button-favorite"],
    },
  }),
});
