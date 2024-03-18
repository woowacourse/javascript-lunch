import { DISTANCE_FROM_CAMPUS, IRestaurantInfo, RESTAURANT_CATEGORY } from '../../domain/Restaurant';
import restaurantStore from '../../store/RestaurantStore';
import Button from '../Button/Button';
import Modal from './Modal';
import FormDropdown from '../Dropdown/FormDropdown';

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
    this.#addCloseEventButton();
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
      this.#formModalElement.classList.remove('modal--open');
      this.#formModalElement.classList.remove('modal--close');
      this.#onSubmit();
      this.#formElement.reset();
    } catch (error: any) {
      alert(error.message);
    }
  }

  #addCloseEventButton() {
    const modalCloseButton = document.getElementById('form-modal-close-button');
    modalCloseButton?.addEventListener('click', () => {
      const modal = document.getElementById('add-form-modal');
      const form = document.getElementById('add-restaurant-form') as HTMLFormElement;

      modal?.classList.remove('modal--open');
      modal?.classList.add('modal--close');
      form?.reset();
    });
  }

  #generateTitle() {
    const title = document.createElement('h2');

    title.classList.add('modal-title', 'text-title');
    title.innerText = '새로운 음식점';

    return title;
  }

  #generateForm() {
    this.#formElement.appendChild(this.#generateCategoryDropdown());
    this.#formElement.appendChild(this.#generateNameInput());
    this.#formElement.appendChild(this.#generateDistanceDropdown());
    this.#formElement.appendChild(this.#generateDescriptionTextArea());
    this.#formElement.appendChild(this.#generateLinkInput());
    this.#formElement.appendChild(this.#generateButtons());
  }

  #generateCategoryDropdown() {
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('form-item', 'form-item--required');

    const label = document.createElement('label');
    label.setAttribute('for', 'name text-caption');
    label.innerText = '카테고리';

    selectContainer.appendChild(label);

    const categorySelect = new FormDropdown(
      'form-category-select-container',
      'category',
      RESTAURANT_CATEGORY as string[],
    );
    categorySelect.element.required = true;
    categorySelect.element.name = 'category';

    selectContainer.appendChild(categorySelect.element);

    return selectContainer;
  }

  #generateNameInput() {
    const container = document.createElement('div');
    container.classList.add('form-item', 'form-item--required');

    container.innerHTML = `<label for="name text-caption">이름</label>
                <input type="text" name="name" id="name" required />`;

    return container;
  }

  #generateDistanceDropdown() {
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('form-item', 'form-item--required');

    const label = document.createElement('label');
    label.setAttribute('for', 'distance text-caption');
    label.innerText = '거리(도보 이동 시간)';

    selectContainer.appendChild(label);

    const distanceSelect = new FormDropdown(
      'form-distance-select-container',
      'distance',
      DISTANCE_FROM_CAMPUS.map(String),
    );
    distanceSelect.element.required = true;
    distanceSelect.element.name = 'distance';

    selectContainer.appendChild(distanceSelect.element);

    return selectContainer;
  }

  #generateDescriptionTextArea() {
    const container = document.createElement('div');
    container.classList.add('form-item');

    const label = document.createElement('label');
    label.setAttribute('for', 'description text-caption');
    label.innerText = '설명';
    container.appendChild(label);

    const textArea = document.createElement('textarea');
    textArea.name = 'description';
    textArea.id = 'description';
    textArea.cols = 30;
    textArea.rows = 5;
    container.appendChild(textArea);

    const span = document.createElement('span');
    span.classList.add('help-text', 'text-caption');
    span.innerText = '메뉴 등 추가 정보를 입력해 주세요.';
    container.appendChild(span);

    return container;
  }

  #generateLinkInput() {
    const container = document.createElement('div');
    container.classList.add('form-item');

    const label = document.createElement('label');
    label.setAttribute('for', 'link text-caption');
    label.innerText = '참고 링크';
    container.appendChild(label);

    container.innerHTML = `<input type="text" name="link" id="link">
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>`;

    return container;
  }

  #generateButtons() {
    const container = document.createElement('div');
    container.classList.add('button-container');

    const cancelButton = new Button({
      content: '취소하기',
      addClassList: ['button--secondary'],
      onClick: () => {
        this.#formModalElement.classList.remove('modal--open');
        this.#formModalElement.classList.remove('modal--close');
      },
    });

    const addButton = new Button({
      content: '추가하기',
      addClassList: ['button--primary'],
      onClick: () => {
        this.#submitFormHandler();
      },
    });

    addButton.element.setAttribute('type', 'submit');

    container.appendChild(cancelButton.element);
    container.appendChild(addButton.element);

    return container;
  }
}

export default FormModal;
