import BaseComponent from '../BaseComponent';

class AlertModal extends BaseComponent {
  #text;

  constructor(text: string) {
    super();
    this.#text = text;
  }

  render() {
    const $modalBox = document.createElement('div');

    const $modalContent = document.createElement('div');
    $modalContent.textContent = this.#text;
    $modalContent.classList.add('alert-modal', 'modal', 'modal--open');

    $modalBox.append($modalContent);

    this.append($modalBox);
    this.classList.add('alert-modal');

    console.log($modalContent);
  }
}

export default AlertModal;

customElements.define('alert-modal', AlertModal);
