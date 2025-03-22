import registerRestaurant from "../services/registerRestaurant";
import { clearInput } from "../utils/clearInput";
import { $ } from "../utils/dom";

const registerFlows = (e, restaurantList) => {
  e.preventDefault();
  try {
    registerRestaurant(restaurantList);

    $("#register-modal-backdrop").classList.remove("open");

    clearInput("#register-form");
  } catch (e) {
    console.log(e.message);

    const currentInputField = $(`#${e.cause}-form-item`);

    currentInputField.appendChild(ErrorMessage(e.message));
  }
};

export default registerFlows;
