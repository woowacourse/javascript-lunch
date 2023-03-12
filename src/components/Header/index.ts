import header from './index.html';
import { $ } from '../../utils/dom';

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = header;
  }

  addModalHandler(openModalButtonHandler: CallableFunction) {
    const $button = $<HTMLButtonElement>('.gnb__button', this);
    $button.addEventListener('click', () => {
      openModalButtonHandler();
    });
  }
}

export default Header;
