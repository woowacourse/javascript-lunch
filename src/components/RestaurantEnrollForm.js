import createElement from '../utils/createElement.js';
import createButton from './common/Button.js';
import createSectionContainer from './common/SectionContainer.js';
import createTextArea from './common/TextArea.js';
import createInputBox from './common/InputBox.js';
import { createLabeldSelectBox } from './common/SelectBox.js';
import {
  RESTAURANT_CATEGORY,
  RESTAURANT_CATEGORY_KEY,
  RESTAURANT_DISTANCE_OPTIONS,
} from '../constants/SETTING.js';

function createRestaurantEnrollForm({ restaurantInput, onEnroll, onCancel }) {
  const $enrollForm = createElement({ tag: 'form' });

  const $categoryBox = createLabeldSelectBox({
    options: Object.values(RESTAURANT_CATEGORY),
    label: '카테고리',
    isRequired: true,
    type: 'category',
    onChange: (event) => {
      restaurantInput.category = RESTAURANT_CATEGORY_KEY[event.target.value];
    },
  });

  const $nameInputBox = createInputBox({
    label: '이름',
    isRequired: true,
    type: 'name',
    onChange: (event) => {
      restaurantInput.name = event.target.value;
    },
  });

  const $distanceBox = createLabeldSelectBox({
    options: RESTAURANT_DISTANCE_OPTIONS,
    label: '거리(도보 이동 시간)',
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

  const $linkInputBox = createInputBox({
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
      onEnroll(event);
    },
  });

  $buttonContainer.append($cancelButton, $enrollButton);
  $enrollForm.append(
    $categoryBox,
    $nameInputBox,
    $distanceBox,
    $descriptionTextArea,
    $linkInputBox,
    $buttonContainer
  );

  return $enrollForm;
}

export default createRestaurantEnrollForm;
