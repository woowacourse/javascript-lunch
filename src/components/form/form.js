const $form = (formFields, { eventType, eventHandler }) => {
  const form = document.createElement("form");
  form.id = "add-restaurant-form";

  formFields.forEach((field) => {
    form.appendChild(field);
  });

  form.addEventListener(eventType, eventHandler);

  return form;
};

export default $form;
