import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import BasicModal from '../Basic/BasicModal/BasicModal';
import SelectBox from '../Basic/SelectBox/SelectBox';
import BasicButton from '../Basic/BasicButton/BasicButton';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import {
  IRestaurant,
  CategoryOrPlaceholder,
  DistanceOrPlaceholder,
  Category,
  DistanceNumeric,
} from '@/types/Restaurant';

import './NewRestaurantModal.css';
import VerticalInputBox from '../Basic/VerticalInputBox/VerticalInputBox';
import AllRestaurantApp from '../AllRestaurantApp';

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

  #makeTitle() {
    const title = document.createElement('h2');
    title.classList.add('modal-title', 'text-title');
    title.textContent = '새로운 음식점';
    return title;
  }

  #makeForm() {
    const $form = document.createElement('form') as HTMLFormElement;
    $form.innerHTML = `
    <div class="form-item form-item--required category-select">
      <label for="category text-caption">카테고리</label>
      <select is="select-box"></select>
      <div class="error hidden">카테고리는 필수 입력입니다.</div>
    </div>
    
    <div is="vertical-input-box"></div>

    <div class="form-item form-item--required distance-select">
      <label for="distance text-caption">거리(도보 이동 시간)</label>
      <select is="select-box"></select>
      <div class="error hidden">거리 값은 필수 입력입니다.</div>
    </div>

    <div class="form-item">
      <label for="description text-caption">설명</label>
      <textarea name="description" id="description" cols="30" rows="5"></textarea>
      <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
    </div>

    <div is="vertical-input-box" class="link-input-box"></div>

    <div class="button-container"></div>
    `;

    const selectBox = $form.querySelector(
      '.category-select select[is="select-box"]',
    ) as SelectBox<CategoryOrPlaceholder>;

    selectBox.set(
      ['선택해주세요', ...CATEGORIES_KEYS],
      ['선택해주세요', ...CATEGORIES_KEYS],
      'category',
    );

    ($form.querySelector('div[is="vertical-input-box"]') as VerticalInputBox).setState({
      name: '이름',
      idName: 'name',
      classList: ['name-input-box'],
      hasVerification: true,
      isRequired: true,
    });

    const DISTANCES_REQURIED = [
      '선택해주세요',
      ...CONDITIONS.DISTANCES.map((num) => `${num}`),
    ] as DistanceOrPlaceholder[];
    const DISTANCES_TEXTS = [
      '선택해주세요',
      ...CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
    ];

    const distanceSelectBox = $form.querySelector(
      '.distance-select select[is="select-box"]',
    ) as SelectBox<DistanceOrPlaceholder>;

    distanceSelectBox.set(DISTANCES_REQURIED, DISTANCES_TEXTS, 'distance');

    const linkInputBox = $form.querySelector('.link-input-box') as VerticalInputBox;
    linkInputBox.setState({
      name: '링크',
      idName: 'link',
      helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    });

    const $buttonBox = $form.querySelector('.button-container')!;
    $buttonBox.append(
      new BasicButton('secondary', '취소하기', 'reset', () => {
        this.closeModal();
      }),
    );
    $buttonBox.append(new BasicButton('primary', '추가하기', 'submit', () => {}));

    return $form;
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
    (this.parentElement as AllRestaurantApp).paint();
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurant-modal', NewRestaurantModal, { extends: 'div' });
