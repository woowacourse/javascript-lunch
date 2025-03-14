const $form = (formFields, formEvent) => {
  const { eventType, eventHandler } = formEvent;
  const form = document.createElement("form");
  form.id = "add-restaurant-form";

  formFields.forEach((field) => {
    form.appendChild(field);
  });

  if (eventType && eventHandler) {
    form.addEventListener(eventType, eventHandler);
  }

  return form;
};

export default $form;
