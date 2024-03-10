import { CATEGORIES_KEYS, CONDITIONS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../SelectBox/SelectBox';
import { ErrorId, ErrorMessage } from '@/constants/ErrorMessage';
import BasicButton from '../BasicButton/BasicButton';
import { closeModal } from '@/utils/view';
import Input from '../Input/Input';

class NewRestaurantModalView extends BaseComponent {
  constructor() {
    super();
  }

  makeForm(form: HTMLElement) {
    form.append(this.#makeCategorySelectBox());
    form.append(this.#makeNameInput());
    form.append(this.#makeDistanceSelectBox());
    form.append(this.#makeDescriptionTextArea());
    form.append(this.#makeLinkInput());
    form.append(this.#makeButtons());
  }

  #makeCategorySelectBox() {
    const $categorySelectBox = document.createElement('div');
    $categorySelectBox.classList.add('form-item', 'form-item--required', 'category-select');

    const $categoryLabel = document.createElement('label');
    $categoryLabel.setAttribute('for', 'category text-caption');
    $categoryLabel.textContent = '카테고리';
    $categorySelectBox.append($categoryLabel);

    const CATEGORIES_KEYS_REQUIRED = ['선택해주세요', ...CATEGORIES_KEYS];

    const $categorySelect = new SelectBox({
      optionValues: CATEGORIES_KEYS_REQUIRED,
      name: 'category',
      classList: [],
      id: 'category',
    });

    $categorySelectBox.append($categorySelect);
    const $errorBox = this.#makeErrorMessage(ErrorMessage.NOT_VALID_CATEGORY, 'category');
    $categorySelectBox.append($errorBox);
    return $categorySelectBox;
  }

  #makeErrorMessage(text: string, id: string) {
    const $errorBox = document.createElement('div');
    $errorBox.id = ErrorId(id);
    $errorBox.classList.add('error', 'hidden');
    $errorBox.textContent = text;
    return $errorBox;
  }

  #makeNameInput() {
    const $nameInputBox = document.createElement('div');
    $nameInputBox.classList.add('form-item', 'form-item--required', 'name-input-box');

    const $nameLabel = document.createElement('label');
    $nameLabel.setAttribute('for', 'name text-caption');
    $nameLabel.textContent = '이름';

    const $nameInput = new Input({
      inputId: 'name',
      inputName: 'name',
      inputMax: '10',
    });

    $nameInputBox.append($nameLabel);
    $nameInputBox.append($nameInput);

    const $errorBox = this.#makeErrorMessage(ErrorMessage.NOT_VALID_NAME, 'name');
    $nameInputBox.append($errorBox);

    return $nameInputBox;
  }

  #makeDistanceSelectBox() {
    const $distanceSelection = document.createElement('div');
    $distanceSelection.classList.add('form-item', 'form-item--required', 'distance-select');

    const $distanceLabel = document.createElement('label');
    $distanceLabel.setAttribute('for', 'distance text-caption');
    $distanceLabel.textContent = '거리(도보 이동 시간)';

    $distanceSelection.append($distanceLabel);
    $distanceSelection.id = 'distance';
    const DISTANCES_REQURIED = [
      '선택해주세요',
      ...CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
    ];
    $distanceSelection.append(
      new SelectBox({
        optionValues: DISTANCES_REQURIED,
        name: 'distance',
        classList: [],
        id: '',
      }),
    );

    const $errorBox = this.#makeErrorMessage(ErrorMessage.NOT_VALID_DISTANCE, 'distance');
    $distanceSelection.append($errorBox);

    return $distanceSelection;
  }

  #makeDescriptionTextArea() {
    const $descriptionTextBox = document.createElement('div');
    $descriptionTextBox.classList.add('form-item');

    const $descriptionLabel = document.createElement('label');
    $descriptionLabel.setAttribute('for', 'description text-caption');
    $descriptionLabel.textContent = '설명';

    const $textArea = document.createElement('textarea');
    $textArea.setAttribute('name', 'description');
    $textArea.setAttribute('id', 'description');
    $textArea.setAttribute('cols', '30');
    $textArea.setAttribute('rows', '5');
    $textArea.setAttribute('max', '300');

    const $span = document.createElement('span');
    $span.classList.add('help-text', 'text-caption');
    $span.textContent = '메뉴 등 추가 정보를 입력해 주세요.';

    $descriptionTextBox.append($descriptionLabel);
    $descriptionTextBox.append($textArea);
    $descriptionTextBox.append($span);

    return $descriptionTextBox;
  }

  #makeLinkInput() {
    const $linkTextBox = document.createElement('div');
    $linkTextBox.classList.add('form-item');

    const $linkLabel = document.createElement('label');
    $linkLabel.setAttribute('for', 'link text-caption');
    $linkLabel.textContent = '참고 링크';

    const $linkInput = new Input({ inputId: 'link', inputName: 'link' });

    const $span = document.createElement('span');
    $span.classList.add('help-text', 'text-caption');
    $span.textContent = '매장 정보를 확인할 수 있는 링크를 입력해 주세요.';

    $linkTextBox.append($linkLabel);
    $linkTextBox.append($linkInput);
    $linkTextBox.append($span);

    const $errorBox = this.#makeErrorMessage(ErrorMessage.NOT_VALID_LINK, 'link');
    $linkTextBox.append($errorBox);

    return $linkTextBox;
  }

  #makeButtons() {
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');

    const cancelButton = new BasicButton({
      variant: 'secondary',
      textContent: '취소하기',
      type: 'reset',
      clickEvent: () => closeModal(this),
    });
    const addButton = new BasicButton({
      variant: 'primary',
      textContent: '추가하기',
      type: 'submit',
      clickEvent: () => {},
    });

    $buttonBox.append(cancelButton);
    $buttonBox.append(addButton);

    return $buttonBox;
  }
}

export default NewRestaurantModalView;

customElements.define('new-restaurantmodalview', NewRestaurantModalView);
