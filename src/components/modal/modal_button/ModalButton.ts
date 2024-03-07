import { modalButtonTemplate } from "./template";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import RestaurantListStorageService from "../../../services/restaurantListStorageService";
import RestaurantList from "../../restaurant_list/RestaurantList";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import validateRestaurantState from "../../../services/validateRestaurantState";
import { IinvalidResult, Irestaurant, IrestaurantField } from "../../../types";

function ModalButton() {
  const render = (modal: Element, form: Element) => {
    form.appendChild(convertHTMLStringToDOM(modalButtonTemplate));

    submitHandler(modal);
    cancelHandler(modal);
  };

  const submitHandler = (modal: Element) => {
    const submitButton = document.getElementsByClassName("button--primary")[0];
    console.log(submitButton);

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();

      const restaurantInfo = restaurantStateStore.getRestaurantField();
      console.log(checkValidateHandler(restaurantInfo));

      const invalidMessage = document.getElementsByClassName("invalid_message");

      if (invalidMessage.length === 0) {
        modal.classList.remove("modal--open");
        RestaurantListStorageService.setData(restaurantInfo as Irestaurant);
      }

      RestaurantList().reRender();
    });
  };

  const checkValidateHandler = (restaurantInfo: IrestaurantField) => {
    const validateResult = validateRestaurantState(restaurantInfo);
    console.log(validateResult);
    removePrevErrorMessage();

    validateResult.forEach((result, index) => {
      if (result.errorMessage && !result.isValid) {
        renderErrorMessage(index, result);
      }
    });
  };

  const removePrevErrorMessage = () => {
    // "invalid_message" 클래스를 가진 모든 요소를 선택
    const prevMessages = document.querySelectorAll(".invalid_message");

    // 각 요소에 대해 반복하여 DOM에서 제거
    prevMessages.forEach((msg) => {
      if (msg && msg.parentNode) {
        msg.parentNode.removeChild(msg);
      }
    });
  };

  const renderErrorMessage = (index: number, result: IinvalidResult) => {
    const targetTag = document.getElementsByClassName("form-item")[index];
    const p = document.createElement("p");
    p.setAttribute("class", `invalid_message ${result.targetClassName}`);
    p.textContent = result.errorMessage;
    targetTag.appendChild(p);
  };

  const cancelHandler = (modal: Element) => {
    const cancelButton =
      document.getElementsByClassName("button--secondary")[0];
    console.log(cancelButton);

    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.remove("modal--open");
    });
  };

  return {
    render,
  };
}

export default ModalButton;
