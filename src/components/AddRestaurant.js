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

    form.appendChild(this.createCategoryContainer());
    form.appendChild(this.createNameContainer());
    form.appendChild(this.createDistanceContainer());
    form.appendChild(this.createDescriptionContainer());
    form.appendChild(this.createLinkContainer());
    form.appendChild(this.createButtonContainer());

    return form;
  }

  createCategoryContainer() {
    const categoryContainer = document.createElement('div');
    const categoryLabel = this.createCategoryLabel();

    categoryContainer.setAttribute('id', 'category-container');
    categoryContainer.classList.add('form-item', 'form-item--required');

    categoryContainer.appendChild(categoryLabel);
    this.createCategorySelectBox(categoryContainer);

    return categoryContainer;
  }

  createCategoryLabel() {
    const categoryLabel = document.createElement('label');

    categoryLabel.setAttribute('for', 'category text-caption');
    categoryLabel.textContent = '카테고리';

    return categoryLabel;
  }

  createCategorySelectBox(categoryContainer) {
    const formCategoryInformation = {
      $target: categoryContainer,
      attributes: FORM_CATEGORY_ATTRIBUTE,
      options: FORM_CATEGORY,
    };
    SelectBoxComponent.create(formCategoryInformation);
  }

  createNameContainer() {
    const nameContainer = document.createElement('div');
    const nameLabel = this.createNameLabel();
    const nameInput = this.createNameInput();

    nameContainer.classList.add('form-item', 'form-item--required');

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);

    return nameContainer;
  }

  createNameLabel() {
    const nameLabel = document.createElement('label');

    nameLabel.setAttribute('for', 'name text-caption');
    nameLabel.textContent = '이름';

    return nameLabel;
  }

  createNameInput() {
    const nameInput = document.createElement('input');

    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('required', 'true');

    return nameInput;
  }

  createDistanceContainer() {
    const distanceContainer = document.createElement('div');
    const distanceLabel = this.createDistanceLabel();

    distanceContainer.setAttribute('id', 'distance-container');
    distanceContainer.classList.add('form-item', 'form-item--required');

    distanceContainer.appendChild(distanceLabel);
    this.createDistanceSelectBox(distanceContainer);

    return distanceContainer;
  }

  createDistanceLabel() {
    const distanceLabel = document.createElement('label');

    distanceLabel.setAttribute('for', 'distance text-caption');
    distanceLabel.textContent = '거리(도보 이동 시간)';

    return distanceLabel;
  }

  createDistanceSelectBox(distanceContainer) {
    const formDistanceInformation = {
      $target: distanceContainer,
      attributes: FORM_DISTANCE_ATTRIBUTE,
      options: FORM_DISTANCE,
    };
    SelectBoxComponent.create(formDistanceInformation);
  }

  createDescriptionContainer() {
    const descriptionContainer = document.createElement('div');
    const descriptionLabel = this.createDescriptionLabel();
    const description = this.createDescription();
    const descriptionHelpText = this.createDescriptionHelpText();

    descriptionContainer.classList.add('form-item');

    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(description);
    descriptionContainer.appendChild(descriptionHelpText);

    return descriptionContainer;
  }

  createDescriptionLabel() {
    const descriptionLabel = document.createElement('label');

    descriptionLabel.setAttribute('for', 'description text-caption');
    descriptionLabel.textContent = '설명';

    return descriptionLabel;
  }

  createDescription() {
    const description = document.createElement('textarea');

    description.setAttribute('name', 'description');
    description.setAttribute('id', 'description');
    description.setAttribute('cols', '30');
    description.setAttribute('rows', '5');

    return description;
  }

  createDescriptionHelpText() {
    const descriptionHelpText = document.createElement('span');

    descriptionHelpText.classList.add('help-text', 'text-caption');
    descriptionHelpText.textContent = '메뉴 등 추가 정보를 입력해 주세요.';

    return descriptionHelpText;
  }

  createLinkContainer() {
    const linkContainer = document.createElement('div');
    const linkLabel = this.createLinkLabel();
    const linkInput = this.createLinkInput();
    const linkHelpText = this.createLinkHelpText();

    linkContainer.classList.add('form-item');

    linkContainer.appendChild(linkLabel);
    linkContainer.appendChild(linkInput);
    linkContainer.appendChild(linkHelpText);

    return linkContainer;
  }

  createLinkLabel() {
    const linkLabel = document.createElement('label');

    linkLabel.setAttribute('for', 'link text-caption');
    linkLabel.textContent = '참고 링크';

    return linkLabel;
  }

  createLinkInput() {
    const linkInput = document.createElement('input');

    linkInput.setAttribute('type', 'text');
    linkInput.setAttribute('name', 'link');
    linkInput.setAttribute('id', 'link');

    return linkInput;
  }

  createLinkHelpText() {
    const linkHelpText = document.createElement('span');

    linkHelpText.classList.add('help-text', 'text-caption');
    linkHelpText.textContent = '매장 정보를 확인할 수 있는 링크를 입력해 주세요.';

    return linkHelpText;
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
