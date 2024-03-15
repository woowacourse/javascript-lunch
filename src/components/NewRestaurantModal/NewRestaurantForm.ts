import { CategoryOrPlaceholder, DistanceOrPlaceholder } from '@/types/Restaurant';
import SelectBox from '../Basic/SelectBox/SelectBox';
import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import VerticalInputBox from '../Basic/VerticalInputBox/VerticalInputBox';
import BasicButton from '../Basic/BasicButton/BasicButton';
import BasicModal from '../Basic/BasicModal/BasicModal';

class NewRestaurantForm extends HTMLFormElement {
  constructor() {
    super();

    this.innerHTML = `
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

    const categorySelectBox = this.querySelector(
      '.category-select select[is="select-box"]',
    ) as SelectBox<CategoryOrPlaceholder>;

    categorySelectBox.set(
      ['선택해주세요', ...CATEGORIES_KEYS],
      ['선택해주세요', ...CATEGORIES_KEYS],
      'category',
    );

    (this.querySelector('div[is="vertical-input-box"]') as VerticalInputBox).setState({
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

    const distanceSelectBox = this.querySelector(
      '.distance-select select[is="select-box"]',
    ) as SelectBox<DistanceOrPlaceholder>;

    distanceSelectBox.set(DISTANCES_REQURIED, DISTANCES_TEXTS, 'distance');

    const linkInputBox = this.querySelector('.link-input-box') as VerticalInputBox;
    linkInputBox.setState({
      name: '링크',
      idName: 'link',
      helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    });

    const $buttonBox = this.querySelector('.button-container')!;
    $buttonBox.append(
      new BasicButton('secondary', '취소하기', 'reset', () => {
        (this.parentElement?.parentElement as BasicModal).closeModal();
      }),
    );
    $buttonBox.append(new BasicButton('primary', '추가하기', 'submit', () => {}));
  }
}

export default NewRestaurantForm;
customElements.define('new-restaurant-form', NewRestaurantForm, { extends: 'form' });
