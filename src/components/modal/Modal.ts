import { template } from "./template";
import SelectCategory from "./select_category/SelectCategory";
import ModalButton from "./modal_button/ModalButton";
import InputName from "./input_name/InputName";
import SelectDistance from "./select_distance/SelectDistance";
import InputDescription from "./input_description/InputDescription";
import InputLink from "./input_link/InputLink";

function Modal() {
  const render = () => {
    const mainContainer = document.getElementById("mainContainer");
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.innerHTML += template;

    if (mainContainer) {
      mainContainer.appendChild(modal);
    }

    // Elements
    const form = document.getElementsByClassName("modal-form")[0];
    SelectCategory().render(form);
    InputName().render(form);
    SelectDistance().render(form);
    InputDescription().render(form);
    InputLink().render(form);

    // Modal
    ModalButton().render(modal, form);
    dimmerClickHandler(modal);
  };

  const dimmerClickHandler = (modal: HTMLElement) => {
    const dimmer = document.getElementsByClassName("modal-backdrop")[0];

    dimmer.addEventListener("click", () => {
      console.log("dimmer");
      modal.classList.remove("modal--open");
    });
  };

  return {
    render,
  };
}

export default Modal;
