import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import BasicModal from '../Basic/BasicModal/BasicModal';
import SelectBox from '../Basic/SelectBox/SelectBox';
import BaseComponent from '../BaseComponent';
import BasicButton from '../Basic/BasicButton/BasicButton';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import {
  IRestaurant,
  CategoryOrPlaceholder,
  DistanceOrPlaceholder,
  CategoryOrAll,
  Category,
  DistanceNumeric,
} from '@/types/Restaurant';

import './NewRestaurantModal.css';
import VerticalInputBox from '../Basic/VerticalInputBox/VerticalInputBox';
import MainApp from '../MainApp';
class NewRestaurantModal extends BasicModal {
  #title: HTMLHeadingElement;
  #form: HTMLFormElement;

  constructor() {
    super();
    this.#title = this.#makeTitle();
    this.#form = this.#makeForm();
    this.appendAll([this.#title, this.#form]);
    this.#setSubmitEvent();
  }

  render() {
    //this.closeModal();
    // NOTE : 필요시 Shadow DOM 을 고려해보는것도 좋음.
    //this.attachShadow({ mode: 'open' });
  }

  #makeTitle() {
    const title = document.createElement('h2');
    title.classList.add('modal-title', 'text-title');
    title.textContent = '새로운 음식점';
    return title;
  }

  #makeForm() {
    const form = document.createElement('form') as HTMLFormElement;

    form.append(this.#makeCategorySelectBox());
    form.append(this.#makeNameInput());
    form.append(this.#makeDistanceSelectBox());
    form.append(this.#makeDescriptionTextArea());
    form.append(this.#makeLinkInput());
    form.append(this.#makeButtons());

    return form;
  }

  #makeCategorySelectBox() {
    const $categorySelectBox = document.createElement('div') as HTMLDivElement;
    $categorySelectBox.classList.add('form-item', 'form-item--required', 'category-select');

    const $categoryLabel = document.createElement('label') as HTMLLabelElement;
    $categoryLabel.setAttribute('for', 'category text-caption');
    $categoryLabel.textContent = '카테고리';
    $categorySelectBox.append($categoryLabel);

    const $categorySelect = new SelectBox<CategoryOrPlaceholder>(
      { values: ['선택해주세요', ...CATEGORIES_KEYS], texts: ['선택해주세요', ...CATEGORIES_KEYS] },
      'category',
    );
    $categorySelectBox.append($categorySelect);

    const errorBox = document.createElement('div');
    errorBox.classList.add('error', 'hidden');
    errorBox.textContent = '카테고리는 필수 입력입니다.';
    $categorySelectBox.append(errorBox);

    return $categorySelectBox;
  }

  #makeNameInput() {
    const inputBoxArgs = {
      name: '이름',
      idName: 'name',
      classList: ['name-input-box'],
      hasVerification: true,
      isRequired: true,
    };

    return new VerticalInputBox(inputBoxArgs);
  }

  #makeDistanceSelectBox() {
    const $distanceSelection = document.createElement('div');
    $distanceSelection.classList.add('form-item', 'form-item--required', 'distance-select');
    $distanceSelection.innerHTML = `<label for="distance text-caption">거리(도보 이동 시간) </label>  
      `;

    const DISTANCES_REQURIED = [
      '선택해주세요',
      ...CONDITIONS.DISTANCES.map((num) => `${num}`),
    ] as DistanceOrPlaceholder[];

    const DISTANCES_TEXTS = [
      '선택해주세요',
      ...CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
    ];

    $distanceSelection.append(
      new SelectBox<DistanceOrPlaceholder>(
        { values: DISTANCES_REQURIED, texts: DISTANCES_TEXTS },
        'distance',
      ),
    );
    const errorBox = document.createElement('div');
    errorBox.classList.add('error', 'hidden');
    errorBox.textContent = '거리 값은 필수 입력입니다.';
    $distanceSelection.append(errorBox);

    return $distanceSelection;
  }

  #makeDescriptionTextArea() {
    const $descriptionTextBox = document.createElement('div');
    $descriptionTextBox.classList.add('form-item');
    $descriptionTextBox.innerHTML = `
              <label for="description text-caption">설명</label>
              <textarea name="description" id="description" cols="30" rows="5"></textarea>
              <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
`;

    return $descriptionTextBox;
  }

  #makeLinkInput() {
    const inputBoxArgs = {
      name: '링크',
      idName: 'link',
      helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    };

    return new VerticalInputBox(inputBoxArgs);
  }

  #makeButtons() {
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');

    const cancelButton = new BasicButton('secondary', '취소하기', 'reset', () => {
      this.closeModal();
    });
    const addButton = new BasicButton('primary', '추가하기', 'submit', () => {});

    $buttonBox.append(cancelButton);
    $buttonBox.append(addButton);

    return $buttonBox;
  }

  #validateRequiredValues(category: string, distance: number, name: string | null) {
    const isNotValidCategory = category === '선택해주세요';
    const isNotValidDistance = Number.isNaN(distance);
    const isNotValidName = !name;
    if (isNotValidCategory) {
      this.querySelector('.category-select > .error')?.classList.remove('hidden');
    }
    if (isNotValidDistance) {
      this.querySelector('.distance-select > .error')?.classList.remove('hidden');
    }
    if (isNotValidName) {
      this.querySelector('.name-input-box > .error')?.classList.remove('hidden');
    }
    return isNotValidCategory || isNotValidDistance || isNotValidName;
  }

  #setSubmitEvent() {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#hideErrorMessage();
      const { name, distance, category, description, link } = this.#getValues();
      if (this.#validateRequiredValues(category, distance, name)) return;

      const distanceNumeric = distance as DistanceNumeric;
      const categoryOnly = category as Category;
      const newRestaurant: IRestaurant = {
        name,
        distance: distanceNumeric,
        category: categoryOnly,
        ...(description && { description }),
        ...(link && { link }),
      };
      const DBService = new RestaurantDBService();
      DBService.add(newRestaurant);

      this.#rerenderApp();
      this.closeModal();
    });
  }

  closeModal() {
    this.#hideErrorMessage();
    this.classList.remove('modal--open');
  }

  openModal() {
    this.classList.add('modal--open');
  }

  getForm() {
    return this.#form;
  }
  #hideErrorMessage() {
    document.querySelector('.category-select > .error')?.classList.add('hidden');
    document.querySelector('.distance-select > .error')?.classList.add('hidden');
    document.querySelector('.name-input-box > .error')?.classList.add('hidden');
  }

  #getValues(): {
    name: string;
    distance: number;
    category: string;
    description: string;
    link: string;
  } {
    const name: string = (this.#form.elements.namedItem('name') as HTMLInputElement).value;
    const distance = Number(
      (this.#form.elements.namedItem('distance') as HTMLSelectElement)
        .value as DistanceOrPlaceholder,
    );

    const category = (this.#form.elements.namedItem('category') as HTMLSelectElement).value;
    const description = (this.#form.elements.namedItem('description') as HTMLInputElement).value;
    const link = (this.#form.elements.namedItem('link') as HTMLInputElement).value;
    return { name, distance, category, description, link };
  }

  #rerenderApp() {
    (this.parentElement as MainApp).paint();
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurant-modal', NewRestaurantModal, { extends: 'div' });
