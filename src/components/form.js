import { handleAddRestaurant } from "./modal";

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