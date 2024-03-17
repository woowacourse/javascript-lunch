import { ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS, ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS } from '../../constant/options';
import Button from '../Common/Button';
import Dropdown from '../Common/Dropdown';
import Modal from '../Modal/Modal';

const fragment = document.createDocumentFragment();

const modalTitle = document.createElement('h2');
modalTitle.classList.add('modal-title', 'text-title');
modalTitle.textContent = '새로운 음식점';
fragment.appendChild(modalTitle);

const form = document.createElement('form');
form.classList.add('form-add-restaurant');

const categoryFormItem = document.createElement('div');
categoryFormItem.classList.add('form-item', 'form-item--required');
const categoryLabel = document.createElement('label');
categoryLabel.htmlFor = 'category';
categoryLabel.classList.add('text-caption');
categoryLabel.textContent = '카테고리';
const categoryDropdown = Dropdown(ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS);
categoryFormItem.appendChild(categoryLabel);
categoryFormItem.appendChild(categoryDropdown);
form.appendChild(categoryFormItem);

const nameFormItem = document.createElement('div');
nameFormItem.classList.add('form-item', 'form-item--required');
const nameLabel = document.createElement('label');
nameLabel.htmlFor = 'name';
nameLabel.classList.add('text-caption');
nameLabel.textContent = '이름';
const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.name = 'name';
nameInput.id = 'name';
nameInput.required = true;
nameFormItem.appendChild(nameLabel);
nameFormItem.appendChild(nameInput);
form.appendChild(nameFormItem);

const distanceFormItem = document.createElement('div');
distanceFormItem.classList.add('form-item', 'form-item--required');
const distanceLabel = document.createElement('label');
distanceLabel.htmlFor = 'distance';
distanceLabel.classList.add('text-caption');
distanceLabel.textContent = '거리(도보 이동 시간)';
const distanceDropdown = Dropdown(ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS);
distanceFormItem.appendChild(distanceLabel);
distanceFormItem.appendChild(distanceDropdown);
form.appendChild(distanceFormItem);

const descriptionFormItem = document.createElement('div');
descriptionFormItem.classList.add('form-item');
const descriptionLabel = document.createElement('label');
descriptionLabel.htmlFor = 'description';
descriptionLabel.classList.add('text-caption');
descriptionLabel.textContent = '설명';
const descriptionTextarea = document.createElement('textarea');
descriptionTextarea.name = 'description';
descriptionTextarea.id = 'description';
descriptionTextarea.cols = 30;
descriptionTextarea.rows = 5;
const descriptionHelpText = document.createElement('span');
descriptionHelpText.classList.add('help-text', 'text-caption');
descriptionHelpText.textContent = '메뉴 등 추가 정보를 입력해 주세요.';
descriptionFormItem.appendChild(descriptionLabel);
descriptionFormItem.appendChild(descriptionTextarea);
descriptionFormItem.appendChild(descriptionHelpText);
form.appendChild(descriptionFormItem);

const linkFormItem = document.createElement('div');
linkFormItem.classList.add('form-item');
const linkLabel = document.createElement('label');
linkLabel.htmlFor = 'link';
linkLabel.classList.add('text-caption');
linkLabel.textContent = '참고 링크';
const linkInput = document.createElement('input');
linkInput.type = 'text';
linkInput.name = 'link';
linkInput.id = 'link';
const linkHelpText = document.createElement('span');
linkHelpText.classList.add('help-text', 'text-caption');
linkHelpText.textContent = '매장 정보를 확인할 수 있는 링크를 입력해 주세요.';
linkFormItem.appendChild(linkLabel);
linkFormItem.appendChild(linkInput);
linkFormItem.appendChild(linkHelpText);
form.appendChild(linkFormItem);

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
const resetButton = Button('reset', 'secondary', '취소하기');
const submitButton = Button('submit', 'primary', '추가하기');
buttonContainer.appendChild(resetButton);
buttonContainer.appendChild(submitButton);
form.appendChild(buttonContainer);

fragment.appendChild(form);

const addingModalLayout = document.createElement('div');
addingModalLayout.appendChild(fragment);

class AddingRestaurantModal extends Modal {
  constructor() {
    super({ child: addingModalLayout });
  }
}

export default AddingRestaurantModal;
