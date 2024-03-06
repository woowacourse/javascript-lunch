import { modalButtonTemplate } from "./template";

function ModalButton() {
  const render = (modal: HTMLElement, form: Element) => {
    form.innerHTML += modalButtonTemplate;
    submitHandler(modal);
    cancelHandler(modal);
  };

  const submitHandler = (modal: HTMLElement) => {
    const submitButton = document.getElementsByClassName("button--primary")[0];
    console.log(submitButton);

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.remove("modal--open");
      console.log("submit");
    });
  };

  const cancelHandler = (modal: HTMLElement) => {
    const cancelButton =
      document.getElementsByClassName("button--secondary")[0];
    console.log(cancelButton);

    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.remove("modal--open");
      console.log("remove");
    });
  };

  return {
    render,
  };
}

export default ModalButton;
