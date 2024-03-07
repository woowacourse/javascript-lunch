import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import BasicModal from '../BasicModal/BasicModal';
import SelectBox from '../SelectBox/SelectBox';
import BaseComponent from '../BaseComponent';
import BasicButton from '../BasicButton/BasicButton';

class NewRestaurantModal extends BaseComponent {
  render() {
    const $fragment = new DocumentFragment();

    const $categorySelection = this.#makeSelectCategory();
    $fragment.append($categorySelection);

    const $nameInputBox = document.createElement('div');
    $nameInputBox.classList.add('form-item', 'form-item--required');
    $nameInputBox.innerHTML = `
    <label for="name text-caption">이름</label>
     <input type="text" name="name" id="name" required />
    `;
    $fragment.append($nameInputBox);

    const $distanceSelection = document.createElement('div');
    $distanceSelection.classList.add('form-item', 'form-item--required');
    $distanceSelection.innerHTML = `<label for="distance text-caption">거리(도보 이동 시간) </label>    `;
    $distanceSelection.append(
      new SelectBox(
        CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
        'distance',
      ),
    );
    $fragment.append($distanceSelection);

    //설명
    const $descriptionTextBox = document.createElement('div');
    $descriptionTextBox.classList.add('form-item');
    $descriptionTextBox.innerHTML = `
              <label for="description text-caption">설명</label>
              <textarea name="description" id="description" cols="30" rows="5"></textarea>
              <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
`;

    $fragment.append($descriptionTextBox);

    const $linkTextBox = document.createElement('div');
    $linkTextBox.classList.add('form-item');
    $linkTextBox.innerHTML = ` <label for="link text-caption">참고 링크</label>
                <input type="text" name="link" id="link" />
                 <span class="help-text text-caption"> 매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>`;
    $fragment.append($linkTextBox);

    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');
    $buttonBox.append(new BasicButton(false, '취소하기'));
    $buttonBox.append(new BasicButton(true, '추가하기'));

    $fragment.append($buttonBox);
    this.append(new BasicModal($fragment));
  }

  #makeSelectCategory() {
    const $fragment = new DocumentFragment();

    const $title = document.createElement('h2');
    $title.classList.add('modal-title', 'text-title');
    $title.textContent = '새로운 음식점';
    $fragment.append($title);

    const $form = document.createElement('form');

    const $categorySelectBox = document.createElement('div');
    $categorySelectBox.classList.add('form-item', 'form-item--required');

    const $categoryLabel = document.createElement('label');
    $categoryLabel.setAttribute('for', 'category text-caption');
    $categoryLabel.textContent = '카테고리';
    $categorySelectBox.append($categoryLabel);

    const $categorySelect = new SelectBox(CATEGORIES_KEYS, 'category');
    $categorySelectBox.append($categorySelect);
    $form.append($categorySelectBox);

    $fragment.append($form);

    return $fragment;
  }
}
export default NewRestaurantModal;

customElements.define('new-restaurantmodal', NewRestaurantModal);
