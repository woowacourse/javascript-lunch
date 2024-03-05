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
  };

  return {
    render,
  };
}

export default Modal;
