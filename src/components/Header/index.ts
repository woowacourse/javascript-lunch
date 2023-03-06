import header from './index.html';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = header;
  }

  addModalHandler(openModalButtonHandler: CallableFunction) {
    const $button = this.querySelector('.gnb__button');
    $button?.addEventListener('click', () => {
      openModalButtonHandler();
    });
  }
}

export default Header;
