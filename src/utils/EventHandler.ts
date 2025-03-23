const EventHandler = {
  modalToggle: (element: HTMLElement, formElement: HTMLFormElement | null = null) => {
    if (formElement) formElement.reset();
    element.classList.toggle("modal--open");
  },
  formDataParsing: (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    return values;
  },
};

export default EventHandler;
