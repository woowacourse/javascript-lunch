const EventHandler = {
  modalToggle: (element, formElement = null) => {
    if (formElement) formElement.reset();
    element.querySelector(".modal").classList.toggle("modal--open");
  },

  formDataParsing: (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    return values;
  },

  tabToggle: (event, elementClassName, toggleName) => {
    const toggleElements = document.querySelectorAll(`.${elementClassName}`);
    const clickedButton = event.target.closest("button");
    for (const element of toggleElements) {
      element.classList.remove("enabled");
    }
    clickedButton.classList.add("enabled");
  },
};

export default EventHandler;
