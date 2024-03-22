import {
  Category,
  CategoryOrPlaceholder,
  DistanceNumeric,
  DistanceOrPlaceholder,
  IRestaurant,
  NumberToString,
} from '@/types/Restaurant';
import SelectBox from '../Basic/SelectBox';
import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import InputBox from '../Basic/VerticalInputBox';
import BasicButton from '../Basic/BasicButton';
import BasicModal from '../Basic/BasicModal';
import { dom } from '@/util/dom';

class NewRestaurantForm extends HTMLFormElement {
  $categorySelect;
  $nameInputBox;
  constructor() {
    super();

    this.innerHTML = this.#template();

    this.$categorySelect = dom.getElement<SelectBox<CategoryOrPlaceholder>>(
      this,
      '.category-select',
    );
    this.$nameInputBox = dom.getElement<InputBox>(this, '.name-input-box');
    this.$distanceSelect = dom.getElement<SelectBox<DistanceOrPlaceholder>>(
      this,
      '.distance-select',
    );

    this.#renderCategoryInput();
    this.#renderNameInput();
    this.#renderSelectBox();
    this.#renderLinkInputBox();
    this.#renderButtonBox();
  }

  #template() {
    return `
    <div class="form-item form-item--required category-select">
      <label for="category text-caption">카테고리</label>
      <select is="select-box" class="category-input"></select>
      <div class="error invisible">카테고리는 필수 입력입니다.</div>
    </div>
    
    <div is="input-box" class="name-input-box"></div>

    <div class="form-item form-item--required distance-select">
      <label for="distance text-caption">거리(도보 이동 시간)</label>
      <select is="select-box" class="distance-input"></select>
      <div class="error invisible">거리 값은 필수 입력입니다.</div>
    </div>

    <div class="form-item">
      <label for="description text-caption">설명</label>
      <textarea name="description" id="description" cols="30" rows="5" class="description-input"></textarea>
      <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
    </div>

    <div is="input-box" class="link-input-box"></div>

    <div class="button-container"></div>
    `;
  }

  #renderCategoryInput() {
    const categorySelectBox = dom.getElement<SelectBox<CategoryOrPlaceholder>>(
      this,
      '.category-select select[is="select-box"]',
    );
    categorySelectBox.set(
      ['선택해주세요', ...CATEGORIES_KEYS],
      ['선택해주세요', ...CATEGORIES_KEYS],
      'category',
    );
  }

  #renderNameInput() {
    dom.getElement<InputBox>(this, 'div[is="input-box"]').setState({
      styleVariant: 'vertical',
      name: '이름',
      idName: 'name',
      hasVerification: true,
      isRequired: true,
      classNames: ['new-restaurant-form__name-input'],
    });
  }

  #renderSelectBox() {
    const DISTANCES_REQUIRED: DistanceOrPlaceholder[] = [
      '선택해주세요',
      ...(CONDITIONS.DISTANCES.map((num) => `${num}`) as NumberToString<DistanceNumeric>[]),
    ];
    const DISTANCES_TEXTS = [
      '선택해주세요',
      ...CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
    ];
    const distanceSelectBox = dom.getElement<SelectBox<DistanceOrPlaceholder>>(
      this,
      '.distance-select select[is="select-box"]',
    );

    distanceSelectBox.set(DISTANCES_REQUIRED, DISTANCES_TEXTS, 'distance');
  }

  #renderLinkInputBox() {
    const linkInputBox = dom.getElement<InputBox>(this, '.link-input-box');
    linkInputBox.setState({
      styleVariant: 'vertical',
      name: '링크',
      idName: 'link',
      helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    });
  }

  #renderButtonBox() {
    const $buttonBox = dom.getElement<HTMLElement>(this, '.button-container');
    const closeModal = () => {
      dom.getElement<BasicModal>(document.body, '.new-restaurant-modal').closeModal();
    };
    $buttonBox.append(
      new BasicButton('secondary', '취소하기', 'reset', closeModal, [
        'new-restaurant-form__cancel-button',
      ]),
    );
    $buttonBox.append(
      new BasicButton('primary', '추가하기', 'submit', () => {}, [
        'new-restaurant-form__submit-button',
      ]),
    );
  }

  invisibleErrorMessage() {
    dom.getElement<HTMLElement>(this, '.category-select > .error').classList.add('invisible');
    dom.getElement<HTMLElement>(this, '.distance-select > .error').classList.add('invisible');
    this.$nameInputBox.invisibleError();
  }

  validateRequiredValues(category: string, distance: number, name: string) {
    const isNotValidCategory = category === '선택해주세요';
    const isNotValidDistance = Number.isNaN(distance);
    const isNotValidName = !name;
    if (isNotValidCategory) {
      dom.getElement(this, '.category-select > .error').classList.remove('invisible');
    }
    if (isNotValidDistance) {
      dom.getElement(this, '.distance-select > .error').classList.remove('invisible');
    }
    if (isNotValidName) {
      this.$nameInputBox.visibleError();
    }
    return isNotValidCategory || isNotValidDistance || isNotValidName;
  }

  getValues(): IRestaurant {
    const name: string = (this.elements.namedItem('name') as HTMLInputElement).value;
    const distance = Number(
      (this.elements.namedItem('distance') as HTMLSelectElement).value as DistanceOrPlaceholder,
    ) as DistanceNumeric;

    const category = (this.elements.namedItem('category') as HTMLSelectElement).value as Category;
    const description = (this.elements.namedItem('description') as HTMLInputElement).value;
    const link = (this.elements.namedItem('link') as HTMLInputElement).value;
    return { name, distance, category, description, link };
  }
}

export default NewRestaurantForm;
customElements.define('new-restaurant-form', NewRestaurantForm, { extends: 'form' });
