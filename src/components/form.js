const $form = (formFields) => {
  const form = document.createElement("form");
  formFields.forEach((field) => {
    form.appendChild(field);
  });

  return form;
};

export default $form;