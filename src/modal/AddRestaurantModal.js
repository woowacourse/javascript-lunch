import Button from '../components/Button.js';
import InputDropDown from '../components/InputDropDown.js';
import InputText from '../components/InputText.js';
import Modal from '../components/Modal.js';
import RestaurantItem from '../components/RestaurantItem.js';
import { DOM } from '../dom.js';
import Restaurant from '../Restaurant.js';
import { RestaurantList } from '../RestaurantList.js';
import { validateDropDown, validateName, validateDescription, validateLink } from '../validation/validations.js';

const CATEGORY_LIST = ['한식', '중식', '일식', '양식', '아시안', '기타'];
const DISTANCE_LIST = ['5분 내', '10분 내', '15분 내', '20분 내', '30분 내'];

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
    return this.#createAddModal();
  }

  #init = () => {
    this.#cancelButton = new Button('button--secondary', '취소하기');
    this.#addButton = new Button('button--primary', '추가하기');
    this.#divCategory = new InputDropDown('카테고리', CATEGORY_LIST);
    this.#divName = new InputText('이름');
    this.#divDistance = new InputDropDown('거리(도보 이동 시간)', DISTANCE_LIST);
    this.#divDescription = new InputText('설명');
    this.#divLink = new InputText('참조 링크');
    this.#modalForm = document.createElement('form');
  };

  #createButton = () => {
    const divButton = document.createElement('div');
    divButton.classList.add('button-container');

    divButton.appendChild(this.#cancelButton);
    divButton.appendChild(this.#addButton);

    return divButton;
  };

  #appendChildToModalForm = () => {
    this.#modalForm.appendChild(this.#divCategory);
    this.#modalForm.appendChild(this.#divName);
    this.#modalForm.appendChild(this.#divDistance);
    this.#modalForm.appendChild(this.#divDescription);
    this.#modalForm.appendChild(this.#divLink);
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

  #addHandler = () => {
    const testData = Object.fromEntries(new FormData(this.#modalForm));
    const newRestaurant = new Restaurant(testData.name, testData.distance, testData.description, testData.category);
    const newRestaurantItem = new RestaurantItem(newRestaurant);
    DOM.RESTAURANT_LIST.appendChild(newRestaurantItem);
  };

  #removeModal = () => {
    const modal = document.querySelector('.modal');
    modal.remove();
  };

  #validateInputs = () => {
    const testData = Object.fromEntries(new FormData(this.#modalForm));
    try {
      validateDropDown('카테고리', testData.category);
      validateName(testData.name);
      validateDropDown('거리', testData.distance);
      validateDescription(testData.description);
      validateLink(testData.link);
      return true;
    } catch (error) {
      alert(error.message);
    }
  };

  #bindEvent = () => {
    this.#addButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.#validateInputs()) {
        this.#addHandler();
        this.#removeModal();
      }
    });

    this.#cancelButton.addEventListener('click', () => {
      this.#removeModal();
    });
  };
}

export default AddRestaurantModal;
