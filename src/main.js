import { createRestaurantList, updateRestaurantList } from './components/RestaurantList.js';
import createSectionContainer from './components/SectionContainer.js';
import {
  CATEGORY_IMAGES,
  CATEGORY_OPTIONS,
  DISTANCE_OPTIONS,
  RESTAURANT_ITEMS,
} from '../public/restaurantData.js';
import createModal from './components/Modal.js';
import createSelectBox from './components/SelectBox.js';
import createInputBox from './components/InputBox.js';
import createTextArea from './components/TextArea.js';
import createButton from './components/Button.js';
import createElement from './utils/createElement.js';

const restaurantInput = {
  category: null,
  name: null,
  distance: null,
  description: null,
  link: null,
};

const $main = document.getElementsByTagName('main')[0];
const $filterContainer = createSectionContainer('restaurant-list-container');
const $restaurantList = createRestaurantList(RESTAURANT_ITEMS);

$filterContainer.appendChild($restaurantList);

const $modalTitle = createElement('h2', 'modal-title text-title', '새로운 음식점');
const $enrollForm = createElement('form');

const $categoryBox = createSelectBox({
  options: CATEGORY_OPTIONS,
  isRequired: true,
  type: 'category',
  onChange: (event) => {
    restaurantInput.category = event.target.value;
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
  onClick: (event) => {
    $modal.classList.remove('modal--open');
  },
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

    restaurantInput.categoryImgSrc = `./category-${CATEGORY_IMAGES[restaurantInput.category]}.png`;
    updateRestaurantList(restaurantInput);
    $modal.classList.remove('modal--open');
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

const fragment = new DocumentFragment();
fragment.append($modalTitle, $enrollForm);

const $enrollRestaurantModal = createModal(fragment);
$main.append($filterContainer, $enrollRestaurantModal);

const $modal = document.querySelector('.modal');
const $openModalButton = document.querySelector('.gnb__button');

$openModalButton.addEventListener('click', () => {
  $modal.classList.add('modal--open');
});

const $backDrop = document.querySelector('.modal-backdrop');

$backDrop.addEventListener('click', () => {
  $modal.classList.remove('modal--open');
});
