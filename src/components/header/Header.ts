import { headerTemplate } from "./template";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

function Header() {
  const render = () => {
    document.body.appendChild(convertHTMLStringToDOM(headerTemplate));

    modalOpenHandler();
  };

  const modalOpenHandler = () => {
    const modal = document.getElementsByClassName("modal")[0];
    const openButton = document.getElementsByClassName("gnb__button")[0];

    openButton.addEventListener("click", () => {
      modal.classList.add("modal--open");
    });
  };

  return {
    render,
  };
}

export default Header;
