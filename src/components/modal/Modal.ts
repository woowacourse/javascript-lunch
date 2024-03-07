import { template } from "./template";
import SelectCategory from "./select_category/SelectCategory";
import ModalButton from "./modal_button/ModalButton";
import InputName from "./input_name/InputName";
import SelectDistance from "./select_distance/SelectDistance";
import InputDescription from "./input_description/InputDescription";
import InputLink from "./input_link/InputLink";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

function Modal() {
  const render = () => {
    const mainContainer = document.getElementById("mainContainer");
    if (mainContainer) {
      mainContainer.appendChild(convertHTMLStringToDOM(template));
    }

    renderModalContent();
  };

  const renderModalContent = () => {
    const modal = document.getElementsByClassName("modal")[0];
    const form = document.getElementsByClassName("modal-form")[0];

    renderModalForm(form);

    ModalButton().render(modal, form);
    dimmerClickHandler(modal);
  };

  const renderModalForm = (form: Element) => {
    SelectCategory().render(form);
    InputName().render(form);
    SelectDistance().render(form);
    InputDescription().render(form);
    InputLink().render(form);
  };

  const dimmerClickHandler = (modal: Element) => {
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
