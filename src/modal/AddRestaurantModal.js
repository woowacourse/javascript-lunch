import Button from '../components/Button.js';
import Input from '../components/Input.js';
import InputDropDown from '../components/InputDropDown.js';
import Modal from '../components/Modal.js';
import RestaurantItem from '../components/Restaurant/RestaurantItem.js';
import CATEGORY from '../constant/category.js';
import DISTANCE from '../constant/distance.js';
import Restaurant from '../domain/Restaurant';
import { validateDescription } from '../validation/validateDescription';
import { validateDropDown } from '../validation/validateDropDown';
import { validateLink } from '../validation/validateLink';
import { validateName } from '../validation/validateName';
import InputText from '../components/Text/InputText.js';
import InputTextArea from '../components/Text/InputTextArea.js';

class AddRestaurantModal extends Modal {
  #cancelButton;
  #addButton;
  #divCategory;
  #divName;
  #divDistance;
  #divDescription;
  #divLink;
  #modalForm;
  #restaurantList;

  constructor(appContainer, restaurantList) {
    super(appContainer);
    this.#restaurantList = restaurantList;
    this.#init();
    this.#bindEvent();
    this.#createAddModal();
    return this;
  }

  #init() {
    this.#cancelButton = new Button('button--secondary', '취소하기');
    this.#addButton = new Button('button--primary', '추가하기');
    this.#divCategory = new Input({
      name: 'category',
      title: '카테고리',
      required: true,
      inputComponent: new InputDropDown({
        name: 'category',
        id: 'category',
        required: true,
        option: CATEGORY,
        optionDefault: '선택해주세요',
      }),
    });
    this.#divName = new Input({
      name: 'name',
      title: '이름',
      required: true,
      inputComponent: new InputText({ name: 'name', required: true }),
    });
    this.#divDistance = new Input({
      name: 'distance',
      title: '거리(도보 이동 시간)',
      required: true,
      inputComponent: new InputDropDown({
        name: 'distance',
        id: 'distance',
        required: true,
        option: DISTANCE,
        optionDefault: '선택해주세요',
      }),
    });
    this.#divDescription = new Input({
      name: 'description',
      title: '설명',
      spanText: '메뉴 등 추가 정보를 입력해 주세요.',
      inputComponent: new InputTextArea({ name: 'description' }),
    });
    this.#divLink = new Input({
      name: 'link',
      title: '참조 링크',
      spanText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
      inputComponent: new InputText({ name: 'link' }),
    });
    this.#modalForm = document.createElement('form');
  }

  #resetForm() {
    this.#divCategory.reset();
    this.#divName.reset();
    this.#divDistance.reset();
    this.#divDescription.reset();
    this.#divLink.reset();
  }

  #createButton() {
    const divButton = document.createElement('div');
    divButton.classList.add('button-container');

    divButton.appendChild(this.#cancelButton);
    divButton.appendChild(this.#addButton);

    return divButton;
  }

  #appendChildToModalForm() {
    this.#modalForm.appendChild(this.#divCategory.getElement());
    this.#modalForm.appendChild(this.#divName.getElement());
    this.#modalForm.appendChild(this.#divDistance.getElement());
    this.#modalForm.appendChild(this.#divDescription.getElement());
    this.#modalForm.appendChild(this.#divLink.getElement());
  }

  #createAddModal() {
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title');
    modalTitle.classList.add('text-title');
    modalTitle.innerText = '새로운 음식점';
    this.addElement(modalTitle);

    this.#appendChildToModalForm();
    this.addElement(this.#modalForm);

    const divButton = this.#createButton();
    this.addElement(divButton);
  }

  #addNewRestaurant() {
    const formData = Object.fromEntries(new FormData(this.#modalForm));

    const newRestaurant = new Restaurant({
      name: formData.name,
      distance: Number(formData.distance),
      description: formData.description,
      category: formData.category,
      link: formData.link,
      isLiked: false,
    });

    this.#restaurantList.addRestaurant(newRestaurant);
  }

  #validateInputs() {
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
  }

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
    const backdrop = this.getBackdrop();
    backdrop.addEventListener('click', () => {
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
