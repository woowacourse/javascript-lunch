import {
  CATEGORIES_KEYS_REQUIRED,
  DISTANCES_REQURIED_TEXT,
  DISTANCES_REQURIED_VALUES,
} from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../SelectBox/SelectBox';
import { ERROR_ID, ERROR_MESSAGE, INFO_MESSAGE } from '@/constants/Message';
import BasicButton from '../BasicButton/BasicButton';
import { closeModal, makeInputInfo, makeLabel } from '@/utils/view';
import Input from '../Input/Input';
import BasicModal from '../BasicModal/BasicModal';
import RestaurantUpdateService from '@/domains/services/RestaurantUpdateService';

class NewRestaurantModal extends BaseComponent {
  #form;
  #title;
  #restaurantUpdateService;

  constructor() {
    super();
    this.#form = document.createElement('form');
    this.#form.id = 'add-form';
    this.#title = document.createElement('h2');
    this.#title.classList.add('modal-title', 'text-title');
    this.#title.textContent = '새로운 음식점';
    this.#restaurantUpdateService = new RestaurantUpdateService();
  }

  render() {
    this.#makeForm();
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#restaurantUpdateService.addNewRestaurant(this.#form);
    });
  }

  #makeForm() {
    const $fragment = new DocumentFragment();
    $fragment.append(this.#makeCategorySelectBox());
    $fragment.append(this.#makeNameInput());
    $fragment.append(this.#makeDistanceSelectBox());
    $fragment.append(this.#makeDescriptionTextArea());
    $fragment.append(this.#makeLinkInput());
    $fragment.append(this.#makeButtons());

    this.#form.append($fragment);

    const $fragment2 = new DocumentFragment();
    $fragment2.append(this.#title);
    $fragment2.append(this.#form);
    this.append(new BasicModal($fragment2, 'bottom'));
  }

  #makeCategorySelectBox() {
    const $categorySelectBox = document.createElement('div');
    $categorySelectBox.classList.add('form-item', 'form-item--required', 'category-select');

    const $categoryLabel = makeLabel({
      htmlFor: 'category',
      text: '카테고리',
    });
    const $categorySelect = new SelectBox({
      optionValues: CATEGORIES_KEYS_REQUIRED,
      optionTexts: CATEGORIES_KEYS_REQUIRED,
      name: 'category',
      classList: [],
      id: 'category',
    });

    $categorySelectBox.append($categoryLabel);
    $categorySelectBox.append($categorySelect);
    const $errorBox = this.#makeErrorMessage(ERROR_MESSAGE.NOT_VALID_CATEGORY, 'category');
    $categorySelectBox.append($errorBox);
    return $categorySelectBox;
  }

  #makeErrorMessage(text: string, id: string) {
    const $errorBox = document.createElement('div');
    $errorBox.id = ERROR_ID(id);
    $errorBox.classList.add('error', 'hidden');
    $errorBox.textContent = text;
    return $errorBox;
  }

  #makeNameInput() {
    const $nameInputBox = document.createElement('div');
    $nameInputBox.classList.add('form-item', 'form-item--required', 'name-input-box');

    const $nameLabel = makeLabel({
      htmlFor: 'name',
      text: '이름',
    });
    const $nameInput = new Input({
      inputId: 'name',
      inputName: 'name',
      inputMax: 10,
    });

    $nameInputBox.append($nameLabel);
    $nameInputBox.append($nameInput);

    const $errorBox = this.#makeErrorMessage(ERROR_MESSAGE.NOT_VALID_NAME, 'name');
    $nameInputBox.append($errorBox);

    return $nameInputBox;
  }

  #makeDistanceSelectBox() {
    const $distanceSelection = document.createElement('div');
    $distanceSelection.classList.add('form-item', 'form-item--required', 'distance-select');

    const $distanceLabel = makeLabel({
      htmlFor: 'distance',
      text: '거리(도보 이동 시간)',
    });
    $distanceSelection.append($distanceLabel);
    $distanceSelection.append(
      new SelectBox({
        optionValues: DISTANCES_REQURIED_VALUES,
        optionTexts: DISTANCES_REQURIED_TEXT,
        name: 'distance',
        classList: [],
        id: 'distance',
      }),
    );

    const $errorBox = this.#makeErrorMessage(ERROR_MESSAGE.NOT_VALID_DISTANCE, 'distance');
    $distanceSelection.append($errorBox);

    return $distanceSelection;
  }

  #makeDescriptionTextArea() {
    const $descriptionTextBox = document.createElement('div');
    $descriptionTextBox.classList.add('form-item');

    const $descriptionLabel = makeLabel({
      htmlFor: 'description',
      text: '설명',
    });

    const $textArea = document.createElement('textarea');
    $textArea.setAttribute('name', 'description');
    $textArea.setAttribute('id', 'description');
    $textArea.setAttribute('cols', '30');
    $textArea.setAttribute('rows', '5');
    $textArea.setAttribute('maxLength', '300');

    const $infoSpan = makeInputInfo(INFO_MESSAGE.DESCRIPTION);

    $descriptionTextBox.append($descriptionLabel);
    $descriptionTextBox.append($textArea);
    $descriptionTextBox.append($infoSpan);

    return $descriptionTextBox;
  }

  #makeLinkInput() {
    const $linkTextBox = document.createElement('div');
    $linkTextBox.classList.add('form-item');

    const $linkLabel = makeLabel({
      htmlFor: 'link',
      text: '참고 링크',
    });

    const $linkInput = new Input({ inputId: 'link', inputName: 'link' });
    const $infoSpan = makeInputInfo(INFO_MESSAGE.LINK);

    $linkTextBox.append($linkLabel);
    $linkTextBox.append($linkInput);
    $linkTextBox.append($infoSpan);

    const $errorBox = this.#makeErrorMessage(ERROR_MESSAGE.NOT_VALID_LINK, 'link');
    $linkTextBox.append($errorBox);

    return $linkTextBox;
  }

  #makeButtons() {
    const $buttonBox = document.createElement('div');
    $buttonBox.classList.add('button-container');

    const $cancelButton = this.#makeCancelButton();
    const $addButton = this.#makeAddButton();

    $buttonBox.append($cancelButton);
    $buttonBox.append($addButton);

    return $buttonBox;
  }

  #makeCancelButton() {
    return new BasicButton({
      variant: 'secondary',
      textContent: '취소하기',
      type: 'reset',
      clickEvent: () => closeModal(),
    });
  }

  #makeAddButton() {
    return new BasicButton({
      variant: 'primary',
      textContent: '추가하기',
      type: 'submit',
      clickEvent: () => {},
      id: 'add-button',
    });
  }
}

export default NewRestaurantModal;

customElements.define('new-restaurantmodal', NewRestaurantModal);
