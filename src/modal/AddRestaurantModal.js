import Button from '../components/Button.js';
import InputDropDown from '../components/InputDropDown.js';
import InputText from '../components/InputText.js';
import Modal from '../components/Modal.js';

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

  constructor() {
    super();
    this.#cancelButton = new Button('button--secondary', '취소하기');
    this.#addButton = new Button('button--primary', '추가하기');
    this.#divCategory = new InputDropDown('카테고리', CATEGORY_LIST);
    this.#divName = new InputText('이름');
    this.#divDistance = new InputDropDown('거리(도보 이동 시간)', DISTANCE_LIST);
    this.#divDescription = new InputText('설명');
    this.#divLink = new InputText('참조 링크');
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
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title');
    modalTitle.classList.add('text-title');
    modalTitle.innerText = '새로운 음식점';
    this.addElement(modalTitle);

    const modalForm = document.createElement('form');
    modalForm.appendChild(this.#divCategory);
    modalForm.appendChild(this.#divName);
    modalForm.appendChild(this.#divDistance);
    modalForm.appendChild(this.#divDescription);
    modalForm.appendChild(this.#divLink);

    this.addElement(modalForm);

    const divButton = this.#createButton();
    this.addElement(divButton);
  };

  #bindEvent = () => {
    this.#addButton.addEventListener('click', () => {
      console.log('addButton click');
    });

    this.#cancelButton.addEventListener('click', () => {
      const modal = document.querySelector('.modal');
      modal.remove();
    });
  };
}

export default AddRestaurantModal;
