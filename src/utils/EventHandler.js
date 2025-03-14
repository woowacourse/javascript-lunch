const EventHandler = {
  modalToggle: (element, formElement = null) => {
    if (formElement) formElement.reset();
    element.classList.toggle("modal--open");
  },
  formDataParsing: (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    return values;
  },
};

export default EventHandler;
