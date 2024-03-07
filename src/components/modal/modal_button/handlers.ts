import RestaurantListStorageService from "../../../services/restaurantListStorageService";
import validateRestaurantState from "../../../services/validateRestaurantState";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import { IinvalidResult, Irestaurant, IrestaurantField } from "../../../types";
import RestaurantList from "../../restaurant_list/RestaurantList";

export const submitHandler = (modal: Element) => {
  const submitButton = document.getElementsByClassName("button--primary")[0];
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    addNewRestaurant(modal);

    RestaurantList().reRender();
  });
};

const addNewRestaurant = (modal: Element) => {
  const restaurantInfo = restaurantStateStore.getRestaurantField();
  const invalidMessage = document.getElementsByClassName("invalid_message");

  if (invalidMessage.length === 0) {
    modal.classList.remove("modal--open");
    RestaurantListStorageService.setData(restaurantInfo as Irestaurant);
    initializeFormState();
  }
};

export const checkValidateHandler = (restaurantInfo: IrestaurantField) => {
  const validateResult = validateRestaurantState(restaurantInfo);
  removePrevErrorMessage();

  validateResult.forEach((result, index) => {
    if (result.errorMessage && !result.isValid) {
      renderErrorMessage(index, result);
    }
  });
};

export const cancelHandler = (modal: Element) => {
  const cancelButton = document.getElementsByClassName("button--secondary")[0];

  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.remove("modal--open");
    initializeFormState();
  });
};

const initializeFormState = () => {
  const modalForm = document.getElementById("modal-form") as HTMLFormElement;
  modalForm.reset();
};

const removePrevErrorMessage = () => {
  const prevMessages = document.querySelectorAll(".invalid_message");

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
