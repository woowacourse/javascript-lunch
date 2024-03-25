import { DISTANCE_FROM_CAMPUS, IRestaurantInfo, RESTAURANT_CATEGORY } from '../../domain/Restaurant';
import restaurantStore from '../../store/RestaurantStore';
import Button from '../Button/Button';
import Modal from './Modal';
import FormDropdown from '../Dropdown/FormDropdown';
import customCreateElement from '../../utils/customCreateElement';

class FormModal extends Modal {
  #formModalElement = this.element;

  #formElement = document.createElement('form');

  #onSubmit: () => void;

  constructor(onSubmit: () => void) {
    super();
    this.#onSubmit = onSubmit;
    this.#formModalElement.id = 'add-form-modal';
    const formContainer = this.#formModalElement.querySelector('.modal-container');

    formContainer?.appendChild(this.#generateTitle());
    this.#generateForm();
    formContainer?.appendChild(this.#formElement);
  }

  #submitFormHandler() {
    this.#formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const restaurantInfo = this.#makeRestaurantInfo(target);

      this.#formSubmitEvent(restaurantInfo);
    });
  }

  #makeRestaurantInfo(target: HTMLFormElement) {
    const name = (target.querySelector('#name') as HTMLInputElement).value;
    const { category, distance, description, link } = target;

    return {
      category: category.value,
      name,
      distanceFromCampus: Number(distance.value),
      description: description.value,
      link: link.value,
      isFavorite: false,
    } as IRestaurantInfo;
  }

  #formSubmitEvent(restaurantInfo: IRestaurantInfo) {
    try {
      restaurantStore.addNewRestaurantToStore(restaurantInfo);
      this.#onSubmit();
      this.#closeFormModal();
    } catch (error: any) {
      alert(error.message);
    }
  }

  #generateTitle() {
    const title = customCreateElement({
      elementType: 'h2',
      classList: ['modal-title', 'text-title'],
      content: '새로운 음식점',
    });

    return title;
  }

  #generateForm() {
    this.#formElement.appendChild(this.#generateCategorySelect());
    this.#formElement.appendChild(this.#generateNameInputContainer());
    this.#formElement.appendChild(this.#generateDistanceSelect());
    this.#formElement.appendChild(this.#generateDescriptionInput());
    this.#formElement.appendChild(this.#generateLinkInputContainer());
    this.#formElement.appendChild(this.#generateButtons());
  }

  #generateCategorySelect() {
    const selectContainer = customCreateElement({
      elementType: 'div',
      classList: ['form-item', 'form-item--required'],
    });

    selectContainer.appendChild(this.#generateCategoryLabel());
    selectContainer.appendChild(this.#generateCategoryDropdown());

    return selectContainer;
  }

  #generateCategoryLabel() {
    const label = customCreateElement({
      elementType: 'label',
      attribute: { for: 'name text-caption' },
      content: '카테고리',
    });

    return label;
  }

  #generateCategoryDropdown() {
    const categorySelect = new FormDropdown({
      id: 'form-category-select-container',
      attribute: { name: 'category', required: true },
      options: RESTAURANT_CATEGORY as string[],
    });

    return categorySelect.element;
  }

  #generateNameInputContainer() {
    const container = customCreateElement({
      elementType: 'div',
      classList: ['form-item', 'form-item--required'],
    });

    container.appendChild(this.#generateNameLabel());
    container.appendChild(this.#generateNameInput());

    return container;
  }

  #generateNameLabel() {
    const label = customCreateElement({
      elementType: 'label',
      classList: ['text-caption'],
      attribute: { for: 'name' },
      content: '이름',
    });

    return label;
  }

  #generateNameInput() {
    const input = customCreateElement({
      id: 'name',
      elementType: 'input',
      attribute: { type: 'text', name: 'name', required: true },
    });

    return input;
  }

  #generateDistanceSelect() {
    const selectContainer = customCreateElement({
      elementType: 'div',
      classList: ['form-item', 'form-item--required'],
    });

    selectContainer.appendChild(this.#generateDistanceLabel());
    selectContainer.appendChild(this.#generateDistanceDropdown());

    return selectContainer;
  }

  #generateDistanceLabel() {
    const label = customCreateElement({
      elementType: 'label',
      classList: ['text-caption'],
      attribute: { for: 'distance' },
      content: '거리(도보 이동 시간)',
    });

    return label;
  }

  #generateDistanceDropdown() {
    const distanceSelect = new FormDropdown({
      id: 'form-distance-select-container',
      attribute: { name: 'distance', required: true },
      options: DISTANCE_FROM_CAMPUS.map(String),
    });

    return distanceSelect.element;
  }

  #generateDescriptionInput() {
    const container = customCreateElement({ elementType: 'div', classList: ['form-item'] });

    container.appendChild(this.#generateDescriptionLabel());
    container.appendChild(this.#generateDescriptionTextArea());
    container.appendChild(this.#generateDescriptionSpan());

    return container;
  }

  #generateDescriptionLabel() {
    const label = customCreateElement({
      elementType: 'label',
      attribute: { for: 'description text-caption' },
      content: '설명',
    });

    return label;
  }

  #generateDescriptionTextArea() {
    const textArea = customCreateElement({
      elementType: 'textarea',
      id: 'description',
      attribute: { name: 'description', cols: 30, rows: 5 },
    });

    return textArea;
  }

  #generateDescriptionSpan() {
    const span = customCreateElement({
      elementType: 'span',
      classList: ['help-text', 'text-caption'],
      content: '메뉴 등 추가 정보를 입력해 주세요.',
    });

    return span;
  }

  #generateLinkInputContainer() {
    const container = customCreateElement({ elementType: 'div', classList: ['form-item'] });

    container.appendChild(this.#generateLinkLabel());
    container.appendChild(this.#generateLinkInput());
    container.appendChild(this.#generateLinkSpan());
    return container;
  }

  #generateLinkLabel() {
    const label = customCreateElement({
      elementType: 'label',
      attribute: { for: 'link text-caption' },
      content: '참고 링크',
    });

    return label;
  }

  #generateLinkInput() {
    const input = customCreateElement({
      elementType: 'input',
      id: 'link',
      attribute: { type: 'text', name: 'link' },
    });

    return input;
  }

  #generateLinkSpan() {
    const span = customCreateElement({
      elementType: 'span',
      classList: ['help-text', 'text-caption'],
      content: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    });

    return span;
  }

  #generateButtons() {
    const container = customCreateElement({ elementType: 'div', classList: ['button-container'] });
    const cancelButton = this.#generateCloseButton();
    const submitButton = this.#generateSubmitButton();

    container.appendChild(cancelButton.element);
    container.appendChild(submitButton.element);

    return container;
  }

  #generateCloseButton() {
    const cancelButton = new Button({
      content: '취소하기',
      addClassList: ['button--secondary'],
      onClick: () => {
        this.#closeFormModal();
      },
    });

    return cancelButton;
  }

  #generateSubmitButton() {
    const submitButton = new Button({
      content: '추가하기',
      addClassList: ['button--primary'],
      onClick: () => {
        this.#submitFormHandler();
      },
    });
    submitButton.element.setAttribute('type', 'submit');

    return submitButton;
  }

  #closeFormModal() {
    this.#formModalElement.classList.remove('modal--open');
    this.#formModalElement.classList.add('modal--close');
    this.#formElement.reset();
  }
}

export default FormModal;
