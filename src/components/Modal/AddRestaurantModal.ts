import {
  ADD_BUTTON_PROPS,
  ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS,
  ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS,
  CANCEL_BUTTON_PROPS,
} from '../../constant/options';
import { $ } from '../../utils/querySelector';
import createButton from '../Common/Button';
import createDropdown from '../Common/Dropdown';
import Modal from './Modal';

const addRestaurantLayout = document.createElement('div');

const titleElement = document.createElement('h2');
titleElement.classList.add('modal-title', 'text-title');
titleElement.textContent = '새로운 음식점';
addRestaurantLayout.append(titleElement);

const formElement = document.createElement('form');
formElement.setAttribute('id', 'add-restaurant');

const categoryDropdown = document.createElement('div');
categoryDropdown.classList.add('form-item', 'form-item--required');
createDropdown(ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS).forEach(node => {
  categoryDropdown.append(node);
});

const nameContainer = document.createElement('div');
nameContainer.classList.add('form-item', 'form-item--required');

const nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'name text-caption');
nameLabel.textContent = '이름';
nameContainer.append(nameLabel);

const nameInput = document.createElement('input');
nameInput.setAttribute('type', 'text');
nameInput.setAttribute('name', 'name');
nameInput.setAttribute('id', 'name');
nameInput.setAttribute('required', 'true');
nameContainer.append(nameInput);

const distanceDropdown = document.createElement('div');
distanceDropdown.classList.add('form-item', 'form-item--required');
createDropdown(ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS).forEach(node => {
  distanceDropdown.append(node);
});

const descriptionContainer = document.createElement('div');
descriptionContainer.classList.add('form-item');

const descriptionLabel = document.createElement('label');
descriptionLabel.setAttribute('for', 'description text-caption');
descriptionLabel.textContent = '설명';
descriptionContainer.append(descriptionLabel);

const descriptionInput = document.createElement('textarea');
descriptionInput.setAttribute('name', 'description');
descriptionInput.setAttribute('id', 'description');
descriptionInput.setAttribute('cols', '30');
descriptionInput.setAttribute('rows', '5');
descriptionContainer.append(descriptionInput);

const descriptionCaption = document.createElement('span');
descriptionCaption.classList.add('help-text', 'text-caption');
descriptionCaption.textContent = '메뉴 등 추가 정보를 입력해 주세요.';
descriptionContainer.append(descriptionCaption);

const linkContainer = document.createElement('div');
linkContainer.classList.add('form-item');

const linkLabel = document.createElement('label');
linkLabel.setAttribute('for', 'description text-caption');
linkLabel.textContent = '설명';
linkContainer.append(linkLabel);

const linkInput = document.createElement('input');
linkInput.setAttribute('type', 'text');
linkInput.setAttribute('name', 'link');
linkInput.setAttribute('id', 'link');
linkContainer.append(linkInput);

const linkCaption = document.createElement('span');
linkCaption.classList.add('help-text', 'text-caption');
linkCaption.textContent = '매장 정보를 확인할 수 있는 링크를 입력해 주세요.';
linkContainer.append(linkCaption);

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
buttonContainer.append(createButton(CANCEL_BUTTON_PROPS));
buttonContainer.append(createButton(ADD_BUTTON_PROPS));

formElement.append(categoryDropdown);
formElement.append(nameContainer);
formElement.append(distanceDropdown);
formElement.append(descriptionContainer);
formElement.append(linkContainer);
formElement.append(buttonContainer);
addRestaurantLayout.append(formElement);

class AddRestaurantModal extends Modal {
  constructor() {
    super({ child: addRestaurantLayout });
  }

  createRestaurant() {
    const category = $('#category').value;
    const name = $('#name').value;
    const distance = parseInt($('#distance').value, 10);
    const description = $('#description').value;
    const link = $('#link').value;

    return {
      id: category + name,
      category: category,
      name: name,
      distance: distance,
      description: description,
      link: link,
      isFavorite: false,
    };
  }
}

export default AddRestaurantModal;
