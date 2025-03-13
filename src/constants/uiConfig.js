// import { handleAddRestaurant } from "../components/form/formEvent.js";
import { addRestaurant } from "../components/form/formEvent.js";
import { handleModalClose } from "../components/modal/modal.js";
import { deepFreeze } from "../utils/deepFreeze.js";
import { validateRestaurantForm } from "../validation/validationForm.js";

const restaurantFormReset = () => {
  handleModalClose();
  const form = document.getElementById("add-restaurant-form");
  form.reset();
};

const handleAddRestaurant = (e) => {
  e.preventDefault();

  try {
    const form = document.getElementById("add-restaurant-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    validateRestaurantForm(form);
    addRestaurant(data);
    restaurantFormReset(form);
  } catch (error) {
    alert(error.message);
  }
};

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
    DELETE: {
      text: "삭제하기",
      eventType: "click",
      event: null,
      attribute: {
        id: "deleteRestaurantButton",
        type: "button",
        disabled: true,
        className: "button button--secondary text-caption cancel-button",
      },
    },
    CLOSE: {
      text: "닫기",
      eventType: "click",
      event: handleModalClose,
      attribute: {
        id: "closeModalButton",
        type: "button",
        className: "button button--primary text-caption add-button",
      },
    },
  },
});
