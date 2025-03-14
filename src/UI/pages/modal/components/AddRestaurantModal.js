import Button from '../../../components/button/Button';
import InputDropDown from '../../../components/input/InputDropDown';
import InputText from '../../../components/input/InputText';
import Modal from '../../../components/modal/Modal';
import RestaurantItem from '../../../components/restaurant/RestaurantItem.js';
import { DOM } from '../../../../dom';
import { addRestaurant } from '../../../../Domain/services/RestaurantService';

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

class AddRestaurantModal {
  #modal;
  #modalForm;
  #cancelButton;
  #addButton;
  #categoryDropDown;
  #nameInput;
  #distanceDropDown;
  #descriptionInput;
  #linkInput;

  constructor() {
    this.#modal = new Modal();
    this.#init();
    this.#createAddModal();
  }

  #init() {
    this.#cancelButton = new Button('button', 'button--secondary', '취소하기', () => this.#handleCancelButton());
    this.#addButton = new Button('submit', 'button--primary', '추가하기', (event) => this.#handleAddButton(event));
    this.#categoryDropDown = new InputDropDown('카테고리', CATEGORY_LIST);
    this.#nameInput = new InputText('이름');
    this.#distanceDropDown = new InputDropDown('거리(도보 이동 시간)', DISTANCE_LIST);
    this.#descriptionInput = new InputText('설명');
    this.#linkInput = new InputText('참조 링크');
    this.#modalForm = document.createElement('form');
  }

  #createAddModal() {
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title', 'text-title');
    modalTitle.innerText = '새로운 음식점';
    this.#modal.addElementToModalContainer(modalTitle);

    this.#modalForm = this.#createModalForm();
    this.#modal.addElementToModalContainer(this.#modalForm);
  }

  #createModalForm() {
    const modalForm = document.createElement('form');

    modalForm.appendChild(this.#createModalFormScrollable());
    modalForm.appendChild(this.#createButtonContainer());

    return modalForm;
  }

  #createModalFormScrollable() {
    const modalFormScrollable = document.createElement('div');
    modalFormScrollable.classList.add('modal-form-scrollable');
    modalFormScrollable.appendChild(this.#categoryDropDown.getElement());
    modalFormScrollable.appendChild(this.#nameInput.getElement());
    modalFormScrollable.appendChild(this.#distanceDropDown.getElement());
    modalFormScrollable.appendChild(this.#descriptionInput.getElement());
    modalFormScrollable.appendChild(this.#linkInput.getElement());
    return modalFormScrollable;
  }

  #createButtonContainer() {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    buttonContainer.appendChild(this.#cancelButton.getElement());
    buttonContainer.appendChild(this.#addButton.getElement());

    return buttonContainer;
  }

  #handleCancelButton() {
    this.handleToggleModal();
  }

  #handleAddButton(event) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(this.#modalForm));

    try {
      const newRestaurant = addRestaurant(formData);
      const newRestaurantItem = new RestaurantItem(newRestaurant);

      DOM.RESTAURANT_LIST.appendChild(newRestaurantItem);

      this.handleToggleModal();
    } catch (error) {
      alert(error.message);
    }
  }

  handleToggleModal() {
    this.#modal.toggleModal();
    this.#modalForm.reset();
  }
}

export default AddRestaurantModal;
