import ModalButton from "./ModalButton";

const Header = {
  template() {
    return `
    <header class="gnb">
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    ${ModalButton.show()}
  </header>`;
  },
};

export default Header;
