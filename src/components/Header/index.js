import header from './index.html';

class Header extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = header;
  }
}

export default Header;
