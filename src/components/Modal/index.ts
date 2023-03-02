import $template from './index.html';

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = $template;
  }

  connectedCallback() {
    this.render();
  }
}

export default Modal;
