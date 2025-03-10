import Button from '../components/Button.js';
import InputDropDown from '../components/InputDropDown.js';
import InputText from '../components/InputText.js';
import Modal from '../components/Modal.js';
import RestaurantItem from '../components/RestaurantItem.js';
import { DOM } from '../dom.js';
import Restaurant from '../Restaurant.js';
import { RestaurantList } from '../RestaurantList.js';
import { validateDropDown, validateName, validateDescription, validateLink } from '../validation/validations.js';

const CATEGORY_LIST = [
  ['한식', '한식'],
  ['중식', '중식'],
  ['일식', '일식'],
  ['양식', '양식'],
  ['아시안', '아시안'],
  ['기타', '기타'],
];

const DISTANCE_LIST = [
  ['5', '5분 내'],
  ['10', '10분 내'],
  ['15', '15분 내'],
  ['20', '20분 내'],
  ['30', '30분 내'],
];

class AddRestaurantModal extends Modal {
  #modalForm;
  #cancelButton;
  #addButton;
  #categoryDropDown;
  #nameInput;
  #distanceDropDown;
  #descriptionInput;
  #linkInput;

  constructor() {
    super();
    this.#init();
    this.#createAddModal();
    this.#bindEvent();
  }

  #init = () => {
    this.#cancelButton = new Button('button--secondary', '취소하기');
    this.#addButton = new Button('button--primary', '추가하기');
    this.#categoryDropDown = new InputDropDown('카테고리', CATEGORY_LIST);
    this.#nameInput = new InputText('이름');
    this.#distanceDropDown = new InputDropDown('거리(도보 이동 시간)', DISTANCE_LIST);
    this.#descriptionInput = new InputText('설명');
    this.#linkInput = new InputText('참조 링크');
    this.#modalForm = document.createElement('form');
  };

  #createAddModal = () => {
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title', 'text-title');
    modalTitle.innerText = '새로운 음식점';
    this.addElementToModalContainer(modalTitle);

    this.#modalForm = this.#createModalForm();  
    this.addElementToModalContainer(this.#modalForm);

    const buttonContainer = this.#createButtonContainer();
    this.addElementToModalContainer(buttonContainer);
  };
  
  #createModalForm = () => {
    const modalForm = document.createElement('form');

    modalForm.appendChild(this.#categoryDropDown);
    modalForm.appendChild(this.#nameInput);
    modalForm.appendChild(this.#distanceDropDown);
    modalForm.appendChild(this.#descriptionInput);
    modalForm.appendChild(this.#linkInput);

    return modalForm;
  };

  #createButtonContainer = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    buttonContainer.appendChild(this.#cancelButton);
    buttonContainer.appendChild(this.#addButton);

    return buttonContainer;
  };

  #bindEvent = () => {
    this.#addButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.#validateInputs()) {
        this.#addHandler();
        this.handleToggleModal();
      }
    });

    this.#cancelButton.addEventListener('click', () => {
      this.handleToggleModal();
    });
  };

  #addHandler = () => {
    const modalFormData = Object.fromEntries(new FormData(this.#modalForm));
    const newRestaurant = new Restaurant(modalFormData.name, modalFormData.distance, modalFormData.description, modalFormData.category);
    const newRestaurantItem = new RestaurantItem(newRestaurant);
    DOM.RESTAURANT_LIST.appendChild(newRestaurantItem);
  };

  #validateInputs = () => {
    const modalFormData = Object.fromEntries(new FormData(this.#modalForm));
    try {
      validateDropDown('카테고리', modalFormData.category);
      validateName(modalFormData.name);
      validateDropDown('거리', modalFormData.distance);
      validateDescription(modalFormData.description);
      validateLink(modalFormData.link);
      return true;
    } catch (error) {
      alert(error.message);
    }
  };

  handleToggleModal = () => {
    this.toggleModal();
    this.#modalForm.reset();
  }
}

export default AddRestaurantModal;
