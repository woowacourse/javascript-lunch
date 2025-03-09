import { CATEGORY_KEY, CATEGORY_OPTIONS, DISTANCE_OPTIONS } from '../../public/restaurantData.js';
import createElement from '../utils/createElement.js';
import createButton from './Button.js';
import createInputBox from './InputBox.js';
import createSectionContainer from './SectionContainer.js';
import createSelectBox from './SelectBox.js';
import createTextArea from './TextArea.js';
import { updateRestaurantList } from './RestaurantList.js';

const restaurantInput = {
  category: null,
  name: null,
  distance: null,
  description: null,
  link: null,
};

function resetInput() {
  document.querySelector('select#category').value = '';
  document.querySelector('input#name').value = '';
  document.querySelector('select#distance').value = '';
  document.querySelector('textarea#description').value = '';
  document.querySelector('input#link').value = '';

  Object.keys(restaurantInput).forEach((key) => {
    restaurantInput[key] = null;
  });
}

function createRestaurantEnrollForm(onCancel) {
  const $enrollForm = createElement({ tag: 'form' });

  const $categoryBox = createSelectBox({
    options: CATEGORY_OPTIONS,
    isRequired: true,
    type: 'category',
    onChange: (event) => {
      restaurantInput.category = CATEGORY_KEY[event.target.value];
    },
  });

  const $$nameInputBox = createInputBox({
    label: '이름',
    isRequired: true,
    type: 'name',
    onChange: (event) => {
      restaurantInput.name = event.target.value;
    },
  });

  const $distanceBox = createSelectBox({
    options: DISTANCE_OPTIONS,
    isRequired: true,
    type: 'distance',
    onChange: (event) => {
      restaurantInput.distance = event.target.value;
    },
  });

  const $descriptionTextArea = createTextArea({
    label: '설명',
    type: 'description',
    helpText: '메뉴 등 추가 정보를 입력해 주세요.',
    onChange: (event) => {
      restaurantInput.description = event.target.value;
    },
  });

  const $$linkInputBox = createInputBox({
    label: '참고 링크',
    isRequired: false,
    type: 'link',
    helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    onChange: (event) => {
      restaurantInput.link = event.target.value;
    },
  });

  const $buttonContainer = createSectionContainer('button-container');
  const $cancelButton = createButton({
    className: 'button--secondary',
    textContent: '취소하기',
    buttonType: 'button',
    onClick: onCancel,
  });

  const $enrollButton = createButton({
    className: 'button--primary',
    textContent: '등록하기',
    onClick: (event) => {
      event.preventDefault();

      if (!restaurantInput.category || !restaurantInput.name || !restaurantInput.distance) {
        alert('카테고리, 이름, 거리 항목은 필수 입력입니다.');
        return;
      }

      updateRestaurantList(restaurantInput);
      onCancel();
    },
  });

  $buttonContainer.append($cancelButton, $enrollButton);
  $enrollForm.append(
    $categoryBox,
    $$nameInputBox,
    $distanceBox,
    $descriptionTextArea,
    $$linkInputBox,
    $buttonContainer
  );

  return $enrollForm;
}

export { createRestaurantEnrollForm, resetInput };
