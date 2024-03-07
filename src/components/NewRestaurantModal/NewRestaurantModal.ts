import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import BasicModal from '../BasicModal/BasicModal';
import SelectBox from '../SelectBox/SelectBox';
import BaseComponent from '../BaseComponent';
import BasicButton from '../BasicButton/BasicButton';

class NewRestaurantModal extends BaseComponent {
  #form;
  #title;

  constructor() {
    super();
    this.#form = document.createElement('form');
    this.#title = document.createElement('h2');

    this.#title.classList.add('modal-title', 'text-title');
    this.#title.textContent = '새로운 음식점';
  }

  render() {
    this.#makeForm();

    const $fragment = new DocumentFragment();
    $fragment.append(this.#title);
    $fragment.append(this.#form);
    this.append(new BasicModal($fragment));
  }

  #makeForm() {
    /* 카테고리 선택 */
    const $categorySelection = this.#makeCategorySelectBox();
    this.#form.append($categorySelection);

    /*이름 인풋박스*/
    const $nameInputBox = document.createElement('div');
    $nameInputBox.classList.add('form-item', 'form-item--required');
    $nameInputBox.innerHTML = `
    <label for="name text-caption">이름</label>
     <input type="text" name="name" id="name" required />
    `;
    this.#form.append($nameInputBox);

    /*거리 셀렉트 박스*/
    const $distanceSelection = document.createElement('div');
    $distanceSelection.classList.add('form-item', 'form-item--required');
    $distanceSelection.innerHTML = `<label for="distance text-caption">거리(도보 이동 시간) </label>    `;
    $distanceSelection.append(
      new SelectBox(
        CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
        'distance',
      ),
    );
    this.#form.append($distanceSelection);

    /*설명 인풋*/
    const $descriptionTextBox = document.createElement('div');
    $descriptionTextBox.classList.add('form-item');
    $descriptionTextBox.innerHTML = `
              <label for="description text-caption">설명</label>
              <textarea name="description" id="description" cols="30" rows="5"></textarea>
              <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
`;

    this.#form.append($descriptionTextBox);

    /*링크 인풋*/
    const $linkTextBox = document.createElement('div');
    $linkTextBox.classList.add('form-item');
    $linkTextBox.innerHTML = ` <label for="link text-caption">참고 링크</label>
                <input type="text" name="link" id="link" />
                 <span class="help-text text-caption"> 매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>`;
    this.#form.append($linkTextBox);

    /*버튼*/
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');
    $buttonBox.append(new BasicButton(false, '취소하기'));
    $buttonBox.append(new BasicButton(true, '추가하기'));

    this.#form.append($buttonBox);
  }

  #makeCategorySelectBox() {
    const $categorySelectBox = document.createElement('div');
    $categorySelectBox.classList.add('form-item', 'form-item--required');

    const $categoryLabel = document.createElement('label');
    $categoryLabel.setAttribute('for', 'category text-caption');
    $categoryLabel.textContent = '카테고리';
    $categorySelectBox.append($categoryLabel);

    const $categorySelect = new SelectBox(CATEGORIES_KEYS, 'category');
    $categorySelectBox.append($categorySelect);

    return $categorySelectBox;
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurantmodal', NewRestaurantModal);
