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
import FilterContainer from '../FilterContainer/FilterContainer';
import VerticalInputBox from '../Basic/VerticalInputBox/VerticalInputBox';
class NewRestaurantModal extends BaseComponent {
  #title: HTMLHeadingElement;
  #form: HTMLFormElement;

  constructor() {
    super();
    this.#form = this.#makeForm();
    this.#title = document.createElement('h2');
    this.#title.classList.add('modal-title', 'text-title');
    this.#title.textContent = '새로운 음식점';
  }

  render() {
    this.#makeForm();

    const $fragment = new DocumentFragment();
    $fragment.append(this.#title);
    $fragment.append(this.#form);
    //this.attachShadow({ mode: 'open' });
    this.append(new BasicModal($fragment));

    this.#submitForm();
    this.closeModal();
  }

  #makeForm() {
    this.#form = document.createElement('form') as HTMLFormElement;
    this.#makeCategorySelectBox();
    this.#makeNameInput();
    this.#makeDistanceSelectBox();
    this.#makeDescriptionTextArea();
    this.#makeLinkInput();

    const inputBoxArgs = {
      name: '버터',
      idName: 'butter',
      classList: ['name-input-box'],
      hasVerification: true,
      isRequired: true,
    };
    this.#form.append(new VerticalInputBox(inputBoxArgs));
    this.#makeButtons();
    return this.#form;
  }

  #makeCategorySelectBox() {
    const $categorySelectBox = document.createElement('div') as HTMLDivElement;
    $categorySelectBox.classList.add('form-item', 'form-item--required', 'category-select');

    const $categoryLabel = document.createElement('label') as HTMLLabelElement;
    $categoryLabel.setAttribute('for', 'category text-caption');
    $categoryLabel.textContent = '카테고리';
    $categorySelectBox.append($categoryLabel);

    const CATEGORIES_KEYS_WITH_PLACEHOLDER: CategoryOrPlaceholder[] = [
      '선택해주세요',
      ...CATEGORIES_KEYS,
    ];
    const $categorySelect = new SelectBox<CategoryOrPlaceholder>(
      CATEGORIES_KEYS_WITH_PLACEHOLDER,
      'category',
    );
    $categorySelectBox.append($categorySelect);

    const errorBox = document.createElement('div');
    errorBox.classList.add('error', 'hidden');
    errorBox.textContent = '카테고리는 필수 입력입니다.';
    $categorySelectBox.append(errorBox);
    this.#form.append($categorySelectBox);
  }

  #makeNameInput() {
    const $nameInputBox = document.createElement('div');
    $nameInputBox.classList.add('form-item', 'form-item--required', 'name-input-box');
    $nameInputBox.innerHTML = `
    <label for="name text-caption">이름</label>
     <input type="text" name="name" id="name" />
    `;
    const errorBox = document.createElement('div');
    errorBox.classList.add('error', 'hidden');
    errorBox.textContent = '이름값은 필수 입력입니다.';

    $nameInputBox.append(errorBox);

    this.#form.append($nameInputBox);
  }

  #makeDistanceSelectBox() {
    const $distanceSelection = document.createElement('div');
    $distanceSelection.classList.add('form-item', 'form-item--required', 'distance-select');
    $distanceSelection.innerHTML = `<label for="distance text-caption">거리(도보 이동 시간) </label>  
      `;

    const DISTANCES_REQURIED = [
      '선택해주세요',
      ...CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
    ];
    $distanceSelection.append(new SelectBox(DISTANCES_REQURIED, 'distance'));
    const errorBox = document.createElement('div');
    errorBox.classList.add('error', 'hidden');
    errorBox.textContent = '거리 값은 필수 입력입니다.';
    $distanceSelection.append(errorBox);

    this.#form.append($distanceSelection);
  }

  #makeDescriptionTextArea() {
    const $descriptionTextBox = document.createElement('div');
    $descriptionTextBox.classList.add('form-item');
    $descriptionTextBox.innerHTML = `
              <label for="description text-caption">설명</label>
              <textarea name="description" id="description" cols="30" rows="5"></textarea>
              <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
`;

    this.#form.append($descriptionTextBox);
  }

  #makeLinkInput() {
    const $linkTextBox = document.createElement('div');
    $linkTextBox.classList.add('form-item');
    $linkTextBox.innerHTML = ` <label for="link text-caption">참고 링크</label>
                <input type="text" name="link" id="link" />
                 <span class="help-text text-caption"> 매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>`;
    this.#form.append($linkTextBox);
  }

  #makeButtons() {
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');

    const cancelButton = new BasicButton(false, '취소하기', 'reset', () => {
      this.closeModal();
    });
    const addButton = new BasicButton(true, '추가하기', 'submit', () => {});

    $buttonBox.append(cancelButton);
    $buttonBox.append(addButton);

    this.#form.append($buttonBox);
  }

  #validateRequiredValues(category: string, distance: number, name: string | null) {
    const isNotValidCategory = category === '선택해주세요';
    const isNotValidDistance = Number.isNaN(distance);
    const isNotValidName = !name;
    if (isNotValidCategory) {
      document.querySelector('.category-select > .error')?.classList.remove('hidden');
    }
    if (isNotValidDistance) {
      document.querySelector('.distance-select > .error')?.classList.remove('hidden');
    }
    if (isNotValidName) {
      document.querySelector('.name-input-box > .error')?.classList.remove('hidden');
    }
    return isNotValidCategory || isNotValidDistance || isNotValidName;
  }

  #submitForm() {
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

      this.#rerenderByFilter();
      this.closeModal();
    });
  }

  closeModal() {
    this.#hideErrorMessage();
    this.classList.remove('modal--open');
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
      (this.#form.elements.namedItem('distance') as HTMLSelectElement).value.slice(
        0,
        -3,
      ) as DistanceOrPlaceholder,
    );

    const category = (this.#form.elements.namedItem('category') as HTMLSelectElement).value;
    const description = (this.#form.elements.namedItem('description') as HTMLInputElement).value;
    const link = (this.#form.elements.namedItem('link') as HTMLInputElement).value;
    return { name, distance, category, description, link };
  }

  #rerenderByFilter() {
    const filterContainer: FilterContainer = document.querySelector('filter-container')!;
    filterContainer.repaint();
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurant-modal', NewRestaurantModal);
