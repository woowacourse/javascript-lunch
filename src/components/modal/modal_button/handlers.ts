import RestaurantCRUD from "../../../domain/RestaurantCRUD";
import validateRestaurantState from "../../../services/validateRestaurantState";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import { Irestaurant } from "../../../types/restaurant";
import { IinvalidResult } from "../../../types/validate";
import RestaurantList from "../../restaurant-list/RestaurantList";

const initializeFormState = () => {
  const modalForm: HTMLFormElement = document.getElementById(
    "modal-form",
  ) as HTMLFormElement;
  modalForm.reset();
  restaurantStateStore.resetState();
};

const addNewRestaurant = (modal: Element, restaurantInfo: Irestaurant) => {
  const invalidMessage = document.getElementsByClassName("invalid_message");

  if (invalidMessage.length === 0) {
    modal.classList.remove("modal--open");
    RestaurantCRUD.addNewRestaurant(restaurantInfo);
    // restaurantListStateStore.addNewRestaurant(restaurantInfo);
    initializeFormState();
  }
};

const removePrevErrorMessage = () => {
  const prevMessages = document.querySelectorAll(".invalid_message");

  prevMessages.forEach((msg) => {
    if (msg && msg.parentNode) {
      msg.parentNode.removeChild(msg);
    }
  });
};

const renderErrorMessage = (index: number, result: Partial<IinvalidResult>) => {
  const targetTag = document.getElementsByClassName("form-item")[index];
  const p = document.createElement("p");
  p.setAttribute("class", `invalid_message ${result.targetClassName}`);
  p.textContent = result.errorMessage as string;
  targetTag.appendChild(p);
};

const checkValidateHandler = (restaurantInfo: Partial<Irestaurant>) => {
  const validateResult = validateRestaurantState(restaurantInfo);
  removePrevErrorMessage();

  validateResult.forEach((result, index) => {
    if (!result.isValid) {
      renderErrorMessage(index, result);
    }
  });
};

export const submitHandler = (modal: Element) => {
  const submitButton = document.getElementsByClassName("button--primary")[0];
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const restaurantInfo = restaurantStateStore.getRestaurantField();
    checkValidateHandler(restaurantInfo);
    addNewRestaurant(modal, restaurantInfo as Irestaurant);
    RestaurantList();
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
