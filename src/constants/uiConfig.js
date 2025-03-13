import {
  restaurantFormReset,
  handleAddRestaurant,
} from "../components/form/formEvent.js";
import { deepFreeze } from "../utils/deepFreeze.js";

export const UI_CONFIG = deepFreeze({
  HEADER: {
    title: "점심 뭐 먹지",
    buttonTitle: "음식점 추가",
    buttonImage: "images/add-button.png",
  },
  BUTTONS: {
    CANCEL: {
      text: "취소하기",
      eventType: "click",
      event: restaurantFormReset,
      attribute: {
        type: "button",
        className: "button button--secondary text-caption cancel-button",
      },
    },
    ADD: {
      text: "추가하기",
      event: handleAddRestaurant,
      attribute: {
        id: "addRestaurantButton",
        type: "submit",
        disabled: true,
        className:
          "button button--primary text-caption add-button button--disabled",
      },
    },
  },
});
