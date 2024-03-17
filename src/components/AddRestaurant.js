import {
  FOMR_BUTTON_INFORMATION,
  FORM_CATEGORY,
  FORM_CATEGORY_ATTRIBUTE,
  FORM_DISTANCE,
  FORM_DISTANCE_ATTRIBUTE,
} from '../constants/filter';
import Button from './Button';
import SelectBoxComponent from './SelectBox';

class AddRestaurant {
  form;
  container;
  closeButton;

  constructor() {
    this.createContainer();
  }

  createContainer() {
    const container = document.createElement('div');
    const title = this.createTitle();
    this.form = this.createForm();

    container.classList.add('modal-container');

    container.appendChild(title);
    container.appendChild(this.form);

    this.container = container;
  }

  createTitle() {
    const title = document.createElement('h2');

    title.classList.add('modal-title', 'text-title');
    title.textContent = '새로운 음식점';

    return title;
  }

  createForm() {
    const form = document.createElement('form');

    const categoryContainer = this.createCategoryContainer();
    const nameContainer = this.createNameContainer();
    const distanceContainer = this.createDistanceContainer();
    const descriptionContainer = this.createDescriptionContainer();
    const linkContainer = this.createLinkContainer();
    const buttonContainer = this.createButtonContainer();

    form.appendChild(categoryContainer);
    form.appendChild(nameContainer);
    form.appendChild(distanceContainer);
    form.appendChild(descriptionContainer);
    form.appendChild(linkContainer);
    form.appendChild(buttonContainer);

    return form;
  }

  createCategoryContainer() {
    const categoryContainer = document.createElement('div');
    const categoryLabel = document.createElement('label');

    categoryContainer.setAttribute('id', 'category-container');
    categoryContainer.classList.add('form-item', 'form-item--required');
    categoryLabel.setAttribute('for', 'category text-caption');
    categoryLabel.textContent = '카테고리';

    categoryContainer.appendChild(categoryLabel);

    const formCategoryInformation = {
      $target: categoryContainer,
      attributes: FORM_CATEGORY_ATTRIBUTE,
      options: FORM_CATEGORY,
    };
    SelectBoxComponent.render(formCategoryInformation);

    return categoryContainer;
  }

  createNameContainer() {
    const nameContainer = document.createElement('div');
    const nameLabel = document.createElement('label');
    const nameInput = document.createElement('input');

    nameContainer.classList.add('form-item', 'form-item--required');
    nameLabel.setAttribute('for', 'name text-caption');
    nameLabel.textContent = '이름';
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('required', 'true');

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);

    return nameContainer;
  }

  createDistanceContainer() {
    const distanceContainer = document.createElement('div');
    const distanceLabel = document.createElement('label');

    distanceContainer.setAttribute('id', 'distance-container');
    distanceContainer.classList.add('form-item', 'form-item--required');
    distanceLabel.setAttribute('for', 'distance text-caption');
    distanceLabel.textContent = '거리(도보 이동 시간)';

    distanceContainer.appendChild(distanceLabel);

    const formDistanceInformation = {
      $target: distanceContainer,
      attributes: FORM_DISTANCE_ATTRIBUTE,
      options: FORM_DISTANCE,
    };
    SelectBoxComponent.render(formDistanceInformation);

    return distanceContainer;
  }

  createDescriptionContainer() {
    const descriptionContainer = document.createElement('div');
    const descriptionLabel = document.createElement('label');
    const description = document.createElement('textarea');
    const helpText = document.createElement('span');

    descriptionContainer.classList.add('form-item');
    descriptionLabel.setAttribute('for', 'description text-caption');
    descriptionLabel.textContent = '설명';
    description.setAttribute('name', 'description');
    description.setAttribute('id', 'description');
    description.setAttribute('cols', '30');
    description.setAttribute('rows', '5');
    helpText.classList.add('help-text', 'text-caption');
    helpText.textContent = '메뉴 등 추가 정보를 입력해 주세요.';

    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(description);
    descriptionContainer.appendChild(helpText);

    return descriptionContainer;
  }

  createLinkContainer() {
    const linkContainer = document.createElement('div');
    const linkLabel = document.createElement('label');
    const linkInput = document.createElement('input');
    const helpText = document.createElement('span');

    linkContainer.classList.add('form-item');
    linkLabel.setAttribute('for', 'link text-caption');
    linkLabel.textContent = '참고 링크';
    linkInput.setAttribute('type', 'text');
    linkInput.setAttribute('name', 'link');
    linkInput.setAttribute('id', 'link');
    helpText.classList.add('help-text', 'text-caption');
    helpText.textContent = '매장 정보를 확인할 수 있는 링크를 입력해 주세요.';

    linkContainer.appendChild(linkLabel);
    linkContainer.appendChild(linkInput);
    linkContainer.appendChild(helpText);

    return linkContainer;
  }

  createButtonContainer() {
    const buttonContainer = document.createElement('div');
    this.closeButton = Button.create(FOMR_BUTTON_INFORMATION['closeButton']);
    const addButton = Button.create(FOMR_BUTTON_INFORMATION['addButton']);

    buttonContainer.classList.add('button-container');

    buttonContainer.appendChild(this.closeButton);
    buttonContainer.appendChild(addButton);

    return buttonContainer;
  }
}

export default AddRestaurant;
