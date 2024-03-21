import {
  CategoryOrPlaceholder,
  DistanceNumeric,
  DistanceOrPlaceholder,
  NumberToString,
} from '@/types/Restaurant';
import SelectBox from '../Basic/SelectBox';
import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import VerticalInputBox from '../Basic/VerticalInputBox';
import BasicButton from '../Basic/BasicButton';
import BasicModal from '../Basic/BasicModal';
import { dom } from '@/util/dom';

class NewRestaurantForm extends HTMLFormElement {
  constructor() {
    super();

    this.innerHTML = this.#template();

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
      <select is="select-box"></select>
      <div class="error invisible">카테고리는 필수 입력입니다.</div>
    </div>
    
    <div is="vertical-input-box"></div>

    <div class="form-item form-item--required distance-select">
      <label for="distance text-caption">거리(도보 이동 시간)</label>
      <select is="select-box"></select>
      <div class="error invisible">거리 값은 필수 입력입니다.</div>
    </div>

    <div class="form-item">
      <label for="description text-caption">설명</label>
      <textarea name="description" id="description" cols="30" rows="5"></textarea>
      <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
    </div>

    <div is="vertical-input-box" class="link-input-box"></div>

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
    dom.getElement<VerticalInputBox>(this, 'div[is="vertical-input-box"]').setState({
      name: '이름',
      idName: 'name',
      classList: ['name-input-box'],
      hasVerification: true,
      isRequired: true,
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
    const linkInputBox = dom.getElement<VerticalInputBox>(this, '.link-input-box');
    linkInputBox.setState({
      name: '링크',
      idName: 'link',
      helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    });
  }

  #renderButtonBox() {
    const $buttonBox = dom.getElement<HTMLElement>(this, '.button-container');
    const closeModal = () => {
      (this.parentElement?.parentElement as BasicModal).closeModal();
    };
    $buttonBox.append(new BasicButton('secondary', '취소하기', 'reset', closeModal));
    $buttonBox.append(new BasicButton('primary', '추가하기', 'submit', () => {}));
  }
}

export default NewRestaurantForm;
customElements.define('new-restaurant-form', NewRestaurantForm, { extends: 'form' });
