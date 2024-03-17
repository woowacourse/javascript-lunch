import './style.css';

class NavigationBarBtnContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const btnText = this.getAttribute('btn-text');
    const $btn = document.createElement('button');
    const $underBar = document.createElement('div');

    if (btnText) {
      $btn.textContent = btnText;
    }

    $underBar.className = 'under-bar';

    this.appendChild($btn);
    this.appendChild($underBar);
  }
}

customElements.define('nav-bar-btn-container', NavigationBarBtnContainer);
