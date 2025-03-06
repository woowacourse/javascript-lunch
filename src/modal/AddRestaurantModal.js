import Button from '../components/Button.js';
import InputDropDown from '../components/InputDropdown.js';
import Modal from '../components/Modal.js';

const CATEGORY_LIST = ['한식', '중식', '일식', '양식', '아시안', '기타'];
const DISTANCE_LIST = ['5분 내', '10분 내', '15분 내', '20분 내', '30분 내'];

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
    const divCategory = new InputDropDown('카테고리', CATEGORY_LIST);
    this.addElement(divCategory);

    const divDistance = new InputDropDown('거리(도보 이동 시간)', DISTANCE_LIST);
    this.addElement(divDistance);

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
