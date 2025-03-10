import { handleModalClose } from "../components/modal/modal.js";
import { handleAddRestaurant } from "../components/form/formEvent.js";

export const UI_CONFIG = Object.freeze({
  HEADER: Object.freeze({
    title: "점심 뭐 먹지",
    buttonTitle: "음식점 추가",
    buttonImage: "images/add-button.png",
  }),
  BUTTONS: Object.freeze({
    CANCEL: {
      text: "취소하기",
      eventType: "click",
      event: handleModalClose,
      attribute: {
        type: "button",
        className: "button button--secondary text-caption cancel-button",
      },
    },
    ADD: {
      text: "추가하기",
      event: handleAddRestaurant,
      attribute: {
        type: "submit",
        className: "button button--primary text-caption add-button",
      },
    },
  }),
});
