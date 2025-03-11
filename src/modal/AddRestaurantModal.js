import Button from '../components/Button.js';
import InputDropDown from '../components/InputDropDown.js';
import InputText from '../components/InputText.js';
import Modal from '../components/Modal.js';
import RestaurantItem from '../components/RestaurantItem.js';
import CATEGORY from '../constant/category.js';
import DISTANCE from '../constant/distance.js';
import { DOM } from '../dom.js';
import Restaurant from '../Restaurant.js';
import { validateDescription } from '../validation/validateDescription.js';
import { validateDropDown } from '../validation/validateDropDown.js';
import { validateLink } from '../validation/validateLink.js';
import { validateName } from '../validation/validateName.js';

class AddRestaurantModal extends Modal {
  #cancelButton;
  #addButton;
  #divCategory;
  #divName;
  #divDistance;
  #divDescription;
  #divLink;
  #modalForm;

  constructor() {
    super();
    this.#init();
    this.#bindEvent();
    this.#createAddModal();
    return this;
  }

  #init = () => {
    this.#cancelButton = new Button('button--secondary', '취소하기');
    this.#addButton = new Button('button--primary', '추가하기');
    this.#divCategory = new InputDropDown('카테고리', CATEGORY);
    this.#divName = new InputText('이름');
    this.#divDistance = new InputDropDown('거리(도보 이동 시간)', DISTANCE);
    this.#divDescription = new InputText('설명');
    this.#divLink = new InputText('참조 링크');
    this.#modalForm = document.createElement('form');
  };

  #resetForm = () => {
    this.#divCategory.reset();
    this.#divName.reset();
    this.#divDistance.reset();
    this.#divDescription.reset();
    this.#divLink.reset();
  };

  #createButton = () => {
    const divButton = document.createElement('div');
    divButton.classList.add('button-container');

    divButton.appendChild(this.#cancelButton);
    divButton.appendChild(this.#addButton);

    return divButton;
  };

  #appendChildToModalForm = () => {
    this.#modalForm.appendChild(this.#divCategory.getElement());
    this.#modalForm.appendChild(this.#divName.getElement());
    this.#modalForm.appendChild(this.#divDistance.getElement());
    this.#modalForm.appendChild(this.#divDescription.getElement());
    this.#modalForm.appendChild(this.#divLink.getElement());
  };

  #createAddModal = () => {
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title');
    modalTitle.classList.add('text-title');
    modalTitle.innerText = '새로운 음식점';
    this.addElement(modalTitle);

    this.#appendChildToModalForm();
    this.addElement(this.#modalForm);

    const divButton = this.#createButton();
    this.addElement(divButton);
  };

  #addNewRestaurant = () => {
    const formData = Object.fromEntries(new FormData(this.#modalForm));
    const newRestaurant = new Restaurant(
      formData.name,
      formData.distance,
      formData.description,
      formData.category,
      formData.link,
    );
    const newRestaurantItem = new RestaurantItem(newRestaurant);
    DOM.RESTAURANT_LIST.appendChild(newRestaurantItem);
  };

  #validateInputs = () => {
    const formData = Object.fromEntries(new FormData(this.#modalForm));
    try {
      validateDropDown('카테고리', formData.category);
      validateName(formData.name);
      validateDropDown('거리', formData.distance);
      validateDescription(formData.description);
      validateLink(formData.link);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  #bindAddButtonEvent = () => {
    this.#addButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.#validateInputs()) {
        this.#addNewRestaurant();
        this.#resetForm();
        this.closeModal();
      }
    });
  };

  #bindCancleButtonEvent = () => {
    this.#cancelButton.addEventListener('click', () => {
      this.#resetForm();
      this.closeModal();
    });
  };

  #bindModalBackDropEvent = () => {
    document.querySelector('.modal-backdrop').addEventListener('click', () => {
      this.#resetForm();
      this.closeModal();
    });
  };

  #bindESCEvent = () => {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.#resetForm();
        this.closeModal();
      }
    });
  };

  #bindEvent = () => {
    this.#bindAddButtonEvent();
    this.#bindCancleButtonEvent();
    this.#bindESCEvent();
    this.#bindModalBackDropEvent();
  };
}

export default AddRestaurantModal;
