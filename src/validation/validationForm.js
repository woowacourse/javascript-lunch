import { ERROR } from "../constants/message.js";

export const validateRestaurantForm = (form) => {
  validateRequired(form);
};

const validateRequired = (form) => {
  const requiredFields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  requiredFields.forEach((requiredField) => {
    if (!requiredField.value.trim()) {
      const labelText = document.querySelector(
        `label[for="${requiredField.id}"]`
      ).textContent;
      throw new Error(`${labelText}${ERROR.INVALID_REQUIRED}`);
    }
  });
};
