import header from './index.html';
import { $ } from '../../utils/dom';

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = header;
  }

  addModalHandler(openModalButtonHandler: CallableFunction) {
    const $button = $<HTMLButtonElement>('.gnb__button');
    $button.addEventListener('click', () => {
      openModalButtonHandler();
    });
  }
}

export default Header;
