import ModalButton from "./ModalButton.js";

const Header = {
  show() {
    const $app = document.querySelector("#app");

    const template = `
    <header class="gnb">
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    ${ModalButton.show()}
  </header>`;

    $app.innerHTML = template;

    ModalButton.setEvent();
  },
};

export default Header;
