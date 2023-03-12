import RestaurantValidator from "../utils/RestaurantValidator";

const addValidator = (element, validator, eventName) => {
  element.addEventListener("focusout", () => {
    try {
      validator(element.value);
      element.dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
    } catch (error) {
      element.dispatchEvent(new CustomEvent(
        eventName,
        {
          bubbles: true,
          detail: { message: error.message },
        },
      ));
    }
  });
};

const addValidatorCallback = (modal) => {
  const categoryInput = modal.element.querySelector("#category");
  const nameInput = modal.element.querySelector("#name");
  const distanceInput = modal.element.querySelector("#distance");
  const linkInput = modal.element.querySelector("#link");

  addValidator(categoryInput, RestaurantValidator.checkCategory, "validateCategory");
  addValidator(nameInput, RestaurantValidator.checkName, "validateName");
  addValidator(distanceInput, RestaurantValidator.checkDistance, "validateDistance");
  addValidator(linkInput, RestaurantValidator.checkLink, "validateLink");
};

export default addValidatorCallback;
