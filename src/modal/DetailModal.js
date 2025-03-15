import Button from '../components/Button.js';
import Modal from '../components/Modal.js';
import RestaurantIcon from '../components/Restaurant/RestaurantIcon.js';

class DetailModal extends Modal {
  #cancelButton;
  #addButton;
  #restaruantIcon;

  constructor(appContainer) {
    super(appContainer);
    this.#init();
    this.#createAddModal();
    this.#bindEvent();
    return this;
  }

  #init() {
    this.#addButton = new Button('button--secondary', '삭제하기');
    this.#cancelButton = new Button('button--primary', '닫기');
  }

  #createAddModal() {
    this.getModalContainer().classList.add('restaurant-modal');
  }

  #createButton() {
    const divButton = document.createElement('div');
    divButton.classList.add('button-container');

    divButton.appendChild(this.#cancelButton);
    console.log(divButton, this.#addButton);
    divButton.appendChild(this.#addButton);

    return divButton;
  }

  addRestaurant(restaurant) {
    restaurant.style.flexDirection = 'column';

    this.addElement(restaurant);
    const divButton = this.#createButton();
    this.addElement(divButton);
  }

  #bindAddButtonEvent = () => {
    this.#addButton.addEventListener('click', (event) => {
      this.#clearModalContent();
      this.closeModal();
    });
  };

  #bindCancleButtonEvent = () => {
    this.#cancelButton.addEventListener('click', () => {
      this.#clearModalContent();
      this.closeModal();
    });
  };

  #bindModalBackDropEvent = () => {
    document.querySelector('.modal-backdrop').addEventListener('click', () => {
      this.#clearModalContent();
      this.closeModal();
    });
  };

  #bindESCEvent = () => {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.#clearModalContent();
        this.closeModal();
      }
    });
  };

  #clearModalContent() {
    const modalContent = this.getModalContainer();

    [...modalContent.children].forEach((child) => {
      if (!child.classList.contains('button-container')) {
        child.remove();
      }
    });
  }

  #bindEvent = () => {
    this.#bindAddButtonEvent();
    this.#bindCancleButtonEvent();
    this.#bindESCEvent();
    this.#bindModalBackDropEvent();
  };
}

export default DetailModal;
