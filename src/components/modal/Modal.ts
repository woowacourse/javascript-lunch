import { template } from "./template";

function Modal() {
  const render = () => {
    const mainContainer = document.getElementById("mainContainer");
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal modal--open");
    modal.innerHTML += template;

    if (mainContainer) {
      mainContainer.appendChild(modal);
    }

    console.log(modal);
    console.log(mainContainer);
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
      // 추가로 수행할 작업이 있다면 이 곳에 추가
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

export default Modal;
