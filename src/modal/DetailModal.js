import Button from '../components/Button.js';
import Modal from '../components/Modal.js';
import RestaurantIcon from '../components/Restaurant/RestaurantIcon.js';
import { convertStringToElement } from '../utils/convertStringToElement.js';

class DetailModal extends Modal {
  #cancelButton;
  #deleteButton;
  #star;
  #currentRestaurant;
  #restaurantList;

  constructor(appContainer, restaurantList) {
    super(appContainer);
    this.#restaurantList = restaurantList;
    this.#init();
    this.#createAddModal();
    this.#bindEvent();
    return this;
  }

  #init() {
    this.#deleteButton = new Button('button--secondary', '삭제하기');
    this.#cancelButton = new Button('button--primary', '닫기');
  }

  #createAddModal() {
    this.getModalContainer().classList.add('restaurant-modal');
  }

  #createButton() {
    const divButton = document.createElement('div');
    divButton.classList.add('button-container');

    divButton.appendChild(this.#deleteButton);
    divButton.appendChild(this.#cancelButton);

    return divButton;
  }

  #setRestaurantStyle(restaurant) {
    restaurant.style.flexDirection = 'column';
    this.#star = restaurant.querySelector('.star-icon');

    const description = restaurant.querySelector('.restaurant__description');
    if (description) {
      description.style.display = 'block';
      description.style.overflow = 'visible';
    }
  }

  #addRestaurantLink(link) {
    const linkDiv = document.createElement('div');
    linkDiv.innerHTML = link;
    return linkDiv;
  }

  addRestaurant(restaurant, restaurantData) {
    this.#currentRestaurant = restaurantData;
    this.#setRestaurantStyle(restaurant);
    this.addElement(restaurant);
    this.addElement(this.#addRestaurantLink(this.#currentRestaurant.getLink()));
    const divButton = this.#createButton();
    this.addElement(divButton);
  }

  #bindDeleteButtonEvent = () => {
    this.#deleteButton.addEventListener('click', (event) => {
      this.#restaurantList.deleteRestaurant(this.#currentRestaurant.getName());
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
    const backdrop = this.getBackdrop();
    backdrop.addEventListener('click', () => {
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
    this.#bindDeleteButtonEvent();
    this.#bindCancleButtonEvent();
    this.#bindESCEvent();
    this.#bindModalBackDropEvent();
  };
}

export default DetailModal;
