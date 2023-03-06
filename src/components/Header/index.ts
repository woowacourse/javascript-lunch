import header from './index.html';

class Header extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = header;
  }

  connectedCallback() {
    const $button = this.querySelector('.gnb__button');
    $button?.addEventListener('click', () => {
      const modal = this.querySelector('.modal');
      modal?.classList.add('modal--open');
    });
  }
}

export default Header;
