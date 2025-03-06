import Button from '../components/Button.js';
import Modal from '../components/Modal.js';

class AddRestaurantModal extends Modal {
  #cancelButton;
  #addButton;

  constructor() {
    super();
    this.#cancelButton = new Button('button--secondary', '취소하기');
    this.#addButton = new Button('button--primary', '추가하기');
    this.#bindEvent();
    return this.#createAddModal();
  }

  #createButton = () => {
    const divButton = document.createElement('div');
    divButton.classList.add('button-container');

    divButton.appendChild(this.#cancelButton);
    divButton.appendChild(this.#addButton);

    return divButton;
  };

  #createAddModal = () => {
    const divButton = this.#createButton();
    this.addElement(divButton);
    return document.querySelector('.modal');
  };

  #bindEvent = () => {
    this.#addButton.addEventListener('click', () => {
      console.log('addButton click');
    });

    this.#cancelButton.addEventListener('click', () => {
      console.log('cancelButton click');
    });
  };
}

export default AddRestaurantModal;
