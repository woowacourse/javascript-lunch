import { template } from "./template";

function Header() {
  const render = () => {
    const mainContainer = document.getElementById("mainContainer");
    const header = document.createElement("header");
    header.setAttribute("class", "headerContainer");
    header.innerHTML += template;

    if (mainContainer) {
      mainContainer.appendChild(header);
    }

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
