import createRestaurantList from './components/createRestaurantList.js';
import createSectionContainer from './components/createSectionContainer.js';
import { restaurantItems, categoryOptions, distanceOptions } from '../public/restaurantData.js';
import createModal from './components/createModal.js';
import createSelectBox from './components/createSelectBox.js';
import createInputBox from './components/createInputBox.js';
import createTextArea from './components/createTextArea.js';
import createButton from './components/createButton.js';
import createElement from './utils/createElement.js';

const main = document.getElementsByTagName('main')[0];
const filterContainer = createSectionContainer('restaurant-list-container');
const restaurantList = createRestaurantList(restaurantItems);

filterContainer.appendChild(restaurantList);

const modalTitle = createElement('h2', 'modal-title text-title', '새로운 음식점');
const enrollForm = createElement('form');

const categoryBox = createSelectBox({
  options: categoryOptions,
  isRequired: true,
  type: 'category',
});
const nameInputBox = createInputBox({ label: '이름', isRequired: true, type: 'name' });
const distanceBox = createSelectBox({
  options: distanceOptions,
  isRequired: true,
  type: 'distance',
});
const descriptionTextArea = createTextArea({
  label: '설명',
  type: 'description',
  helpText: '메뉴 등 추가 정보를 입력해 주세요.',
});
const linkInputBox = createInputBox({
  label: '참고 링크',
  isRequired: false,
  type: 'link',
  helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
});

const buttonContainer = createSectionContainer('button-container');
const cancelButton = createButton({
  className: 'button--secondary',
  textContent: '취소하기',
  buttonType: 'button',
});
const enrollButton = createButton({
  className: 'button--primary',
  textContent: '등록하기',
});

buttonContainer.append(cancelButton, enrollButton);

enrollForm.append(
  categoryBox,
  nameInputBox,
  distanceBox,
  descriptionTextArea,
  linkInputBox,
  buttonContainer
);

const fragment = new DocumentFragment();
fragment.append(modalTitle, enrollForm);

const enrollRestaurantModal = createModal(fragment);
main.append(filterContainer, enrollRestaurantModal);

const modal = document.querySelector('.modal');
const openModalButton = document.querySelector('.gnb__button');

openModalButton.addEventListener('click', () => {
  modal.classList.add('modal--open');
});

const categorySelectBox = document.querySelector('select#category');
const nameInput = document.querySelector('input#name');
const distanceSelectBox = document.querySelector('select#distance');
const descriptionTextarea = document.querySelector('textarea#description');
const linkInput = document.querySelector('input#link');

categorySelectBox.addEventListener('change', (event) => {
  console.log(event.target.value);
});

nameInput.addEventListener('change', (event) => {
  console.log(event.target.value);
});

console.log(distanceSelectBox);
distanceSelectBox.addEventListener('change', (event) => {
  console.log(event.target.value);
});

descriptionTextArea.addEventListener('change', (event) => {
  console.log(event.target.value);
});

linkInput.addEventListener('change', (event) => {
  console.log(event.target.value);
});
