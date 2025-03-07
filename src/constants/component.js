import { handleModalClose, handleAddRestaurant } from "../components/modal.js";

export const HEADER_INFO = Object.freeze({
  TITLE: "점심 뭐 먹지",
  BUTTON_TITLE: "음식점 추가",
  BUTTON_IMAGE: "images/add-button.png",
});

export const CANCEL_BUTTON = {
  TEXT: "취소하기",
  EVENT: handleModalClose,
  CLASS_NAME: ["button", "button--secondary", "text-caption", "cancel-button"],
};

export const ADD_BUTTON = {
  TEXT: "추가하기",
  EVENT: handleAddRestaurant,
  CLASS_NAME: ["button", "button--primary", "text-caption", "add-button"],
};
