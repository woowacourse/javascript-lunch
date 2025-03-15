import Button from '../../../components/button/Button';
import InputDropDown from '../../../components/input/InputDropDown';
import InputText from '../../../components/input/InputText';
import Modal from '../../../components/modal/Modal';
import { addRestaurant } from '../../../../Domain/services/RestaurantService';
import { RestaurantData } from '../../../../Domain/types/RestaurantTypes';

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
  #modal: Modal;
  #modalForm: HTMLFormElement;
  #cancelButton!: Button;
  #addButton!: Button;
  #categoryDropDown!: InputDropDown;
  #nameInput!: InputText;
  #distanceDropDown!: InputDropDown;
  #descriptionInput!: InputText;
  #linkInput!: InputText;
  #onRestaurantAdded: () => void;

  constructor(onRestaurantAdded: () => void = () => {}) {
    this.#modal = new Modal();
    this.#modalForm = document.createElement('form');
    this.#onRestaurantAdded = onRestaurantAdded;
    this.#init();
    this.#createAddModal();
  }

  #init(): void {
    this.#cancelButton = new Button('button', 'button--secondary', '취소하기', () => this.#handleCancelButton());
    this.#addButton = new Button('submit', 'button--primary', '추가하기', (event: MouseEvent) =>
      this.#handleAddButton(event),
    );
    this.#categoryDropDown = new InputDropDown('카테고리', CATEGORY_LIST);
    this.#nameInput = new InputText('이름');
    this.#distanceDropDown = new InputDropDown('거리(도보 이동 시간)', DISTANCE_LIST);
    this.#descriptionInput = new InputText('설명');
    this.#linkInput = new InputText('참조 링크');
  }

  #createAddModal(): void {
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title', 'text-title');
    modalTitle.innerText = '새로운 음식점';
    this.#modal.addElementToModalContainer(modalTitle);

    this.#modalForm = this.#createModalForm();
    this.#modal.addElementToModalContainer(this.#modalForm);
  }

  #createModalForm(): HTMLFormElement {
    const modalForm = document.createElement('form');

    modalForm.appendChild(this.#createModalFormScrollable());
    modalForm.appendChild(this.#createButtonContainer());

    return modalForm;
  }

  #createModalFormScrollable(): HTMLDivElement {
    const modalFormScrollable = document.createElement('div');
    modalFormScrollable.classList.add('modal-form-scrollable');
    modalFormScrollable.appendChild(this.#categoryDropDown.getElement());
    modalFormScrollable.appendChild(this.#nameInput.getElement());
    modalFormScrollable.appendChild(this.#distanceDropDown.getElement());
    modalFormScrollable.appendChild(this.#descriptionInput.getElement());
    modalFormScrollable.appendChild(this.#linkInput.getElement());
    return modalFormScrollable;
  }

  #createButtonContainer(): HTMLDivElement {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    buttonContainer.appendChild(this.#cancelButton.getElement());
    buttonContainer.appendChild(this.#addButton.getElement());

    return buttonContainer;
  }

  #handleCancelButton(): void {
    this.handleToggleModal();
  }

  #handleAddButton(event: Event): void {
    event.preventDefault();

    const formData = new FormData(this.#modalForm);
    const restaurantData: RestaurantData = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      distance: formData.get('distance') as string,
      description: (formData.get('description') as string) || undefined,
      link: (formData.get('link') as string) || undefined,
      isFavorite: false,
    };

    try {
      const newRestaurant = addRestaurant(restaurantData);

      this.#onRestaurantAdded();

      this.handleToggleModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  }

  handleToggleModal(): void {
    this.#modal.toggleModal();
    this.#modalForm.reset();
  }
}

export default AddRestaurantModal;
