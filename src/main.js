import { createRestaurantList, updateRestaurantList } from './components/RestaurantList.js';
import createSectionContainer from './components/SectionContainer.js';
import { CATEGORY_OPTIONS, DISTANCE_OPTIONS, RESTAURANT_ITEMS } from '../public/restaurantData.js';
import createModal from './components/Modal.js';
import createSelectBox from './components/SelectBox.js';
import createInputBox from './components/InputBox.js';
import createTextArea from './components/TextArea.js';
import createButton from './components/Button.js';
import createElement from './utils/createElement.js';

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
});
const $$nameInputBox = createInputBox({ label: '이름', isRequired: true, type: 'name' });
const $distanceBox = createSelectBox({
  options: DISTANCE_OPTIONS,
  isRequired: true,
  type: 'distance',
});
const $descriptionTextArea = createTextArea({
  label: '설명',
  type: 'description',
  helpText: '메뉴 등 추가 정보를 입력해 주세요.',
});
const $$linkInputBox = createInputBox({
  label: '참고 링크',
  isRequired: false,
  type: 'link',
  helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
});

const $buttonContainer = createSectionContainer('button-container');
const $cancelButton = createButton({
  className: 'button--secondary',
  textContent: '취소하기',
  buttonType: 'button',
});
const $enrollButton = createButton({
  className: 'button--primary',
  textContent: '등록하기',
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

const $categorySelectBox = document.querySelector('select#category');
const $nameInput = document.querySelector('input#name');
const $distanceSelectBox = document.querySelector('select#distance');
const $descriptionTextarea = document.querySelector('textarea#description');
const $linkInput = document.querySelector('input#link');
const $backDrop = document.querySelector('.modal-backdrop');

const restaurantInput = {
  category: null,
  name: null,
  distance: null,
  description: null,
  link: null,
};

$categorySelectBox.addEventListener('change', (event) => {
  restaurantInput.category = event.target.value;
});

$nameInput.addEventListener('change', (event) => {
  restaurantInput.name = event.target.value;
});

$distanceSelectBox.addEventListener('change', (event) => {
  restaurantInput.distance = event.target.value;
});

$descriptionTextArea.addEventListener('change', (event) => {
  restaurantInput.description = event.target.value;
});

$linkInput.addEventListener('change', (event) => {
  restaurantInput.link = event.target.value;
});

const $$enrollForm = document.querySelector('form');

$$enrollForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!restaurantInput.category || !restaurantInput.name || !restaurantInput.distance) {
    alert('카테고리, 이름, 거리 항목은 필수 입력입니다.');
    return;
  }

  restaurantInput.categoryImgSrc = `./category-${categoryImages[restaurantInput.category]}.png`;
  updateRestaurantList(restaurantInput);
  $modal.classList.remove('modal--open');
});

$cancelButton.addEventListener('click', () => {
  $modal.classList.remove('modal--open');
});

$backDrop.addEventListener('click', () => {
  $modal.classList.remove('modal--open');
});
