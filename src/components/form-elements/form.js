import { addRestaurant } from "../modal/modal.js";

export const handleAddRestaurant = (e) => {
  e.preventDefault();

  try {
    const form = document.getElementById("add-restaurant-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    validateForm(form);
    addRestaurant(data);
  } catch (error) {
    alert(error.message);
  }
};

const validateForm = (form) => {
  const requiredFields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  requiredFields.forEach((requiredField) => {
    if (!requiredField.value.trim()) {
      const labelText = document.querySelector(
        `label[for="${requiredField.id} text-caption"]`
      ).innerText;
      throw new Error(`${labelText}(은)는 필수 값입니다.`);
    }
  });
};

const $form = (formFields) => {
  const form = document.createElement("form");
  form.id = "add-restaurant-form";

  formFields.forEach((field) => {
    form.appendChild(field);
  });

  form.addEventListener("submit", handleAddRestaurant);

  return form;
};

export default $form;
