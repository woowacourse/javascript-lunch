import { ERROR } from "../constants/message.js";

const validateRequired = (form, requiredFields) => {
  requiredFields.forEach((requiredField) => {
    if (!form[requiredField].value.trim()) {
      const labelText = document.querySelector(
        `label[for="${form[requiredField].id}"]`
      ).textContent;
      throw new Error(`${labelText}${ERROR.INVALID_REQUIRED}`);
    }
  });
};

export const validateRestaurantForm = (form, requiredField) => {
  validateRequired(form, requiredField);
};
