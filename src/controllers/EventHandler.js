const EventHandler = {
  modalClose: (formElement, mainElement) => {
    formElement.reset();
    mainElement.querySelector(".modal").classList.remove("modal--open");
  },
};

export default EventHandler;
