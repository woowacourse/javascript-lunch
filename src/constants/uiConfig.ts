import { handleModalClose } from "../components/modal/modal.ts";
import { handleAddRestaurant } from "../components/form-elements/form.ts";

type HeaderConfig = {
  title: string;
  buttonTitle: string;
  buttonImage: string;
};

type ButtonConfig = {
  text: string;
  type: "button" | "submit";
  event: (event: Event) => void;
  className: string[];
};

type UIConfig = {
  HEADER: HeaderConfig,
  BUTTONS: {
    CANCEL: ButtonConfig,
    ADD: ButtonConfig,
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
      text: "취소하기",
      type: "button" as const,
      event: handleModalClose,
      className: [
        "button",
        "button--secondary",
        "text-caption",
        "cancel-button",
      ],
    },
    ADD: {
      text: "추가하기",
      type: "submit" as const,
      event: handleAddRestaurant,
      className: ["button", "button--primary", "text-caption", "add-button"],
    },
  }),
});
