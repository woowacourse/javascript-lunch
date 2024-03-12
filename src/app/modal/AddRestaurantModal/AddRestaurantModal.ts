import { $ } from '../../../util/domSelector';
import handleError from '../../../util/handleError';
import { createOptionItems } from '../../../util/createOptionItems';
import RestaurantValidator from '../../../validator/RestaurantValidator';

import type { RestaurantData } from '../../../type/RestaurantData';
import type {
  FormItemContainerElementType,
  LabelElementType,
  InputElementType,
  SelectBoxElementType,
  TextAreaElementType,
  CaptionElementType,
  ButtonElementType,
} from '../../../type/formElementTypes';

import { Category, DistanceByWalk } from '../../../enum/enums';

class AddRestaurantModal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    $('#cancel-adding-restaurant-button').addEventListener('click', this.clearModal.bind(this));
    $('#add-restaurant-form').addEventListener('submit', this.handleSubmit.bind(this));
  }

  private handleSubmit(event: Event) {
    try {
      event.preventDefault();
      const newRestaurantData = this.handleFormData(new FormData(event.target as HTMLFormElement));
      this.submitNewRestaurant(newRestaurantData);
      this.clearModal();
    } catch (error) {
      handleError(error);
    }
  }

  private handleFormData(formData: FormData): RestaurantData {
    const formDataEntries = Object.fromEntries(formData.entries());
    if (this.isRestaurantData(formDataEntries)) {
      return formDataEntries;
    }
    throw new Error('입력된 음식점 정보가 올바르지 않습니다. 새로고침 후 다시 입력해주세요.');
  }

  private submitNewRestaurant(newRestaurantData: RestaurantData) {
    try {
      RestaurantValidator.validateUserInput(newRestaurantData);
      this.dispatchEvent(new CustomEvent('submitAddingRestaurant', { detail: newRestaurantData }));
    } catch (error) {
      handleError(error);
    }
  }

  private isRestaurantData(object: any): object is RestaurantData {
    return (
      'name' in object &&
      'category' in object &&
      Object.values(Category).includes(object.category) &&
      'distanceByWalk' in object &&
      Object.values(DistanceByWalk).includes(object.distanceByWalk)
    );
  }

  private clearModal() {
    $<HTMLFormElement>('#add-restaurant-form').reset();
    $<HTMLDialogElement>('#add-restaurant-modal').close();
  }

  private createSelectBox({ name, required }: SelectBoxElementType): HTMLSelectElement {
    const selectBox = document.createElement('select');
    selectBox.name = name;
    selectBox.id = `restaurant-${name}`;
    selectBox.required = required;
    return selectBox;
  }

  private createModal(): HTMLDialogElement {
    const modal = document.createElement('dialog');
    modal.id = 'add-restaurant-modal';

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    modal.appendChild(modalContainer);
    modalContainer.appendChild(this.createModalTitle());
    modalContainer.appendChild(this.createAddRestaurantForm());

    return modal;
  }

  private createModalTitle(): HTMLHeadingElement {
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title', 'text-title');
    modalTitle.textContent = '새로운 음식점';
    return modalTitle;
  }

  private createNameInput(): HTMLDivElement {
    const nameInput = this.createFormItemContainer({ required: true });
    nameInput.appendChild(this.createLabel({ targetId: 'name', labelText: '이름' }));
    nameInput.appendChild(this.createInput({ type: 'text', name: 'name', required: true }));
    return nameInput;
  }

  private createCategoryInput(): HTMLDivElement {
    const categoryInput = this.createFormItemContainer({ required: true });
    const categorySelectBox = this.createSelectBox({ name: 'category', required: true });
    categorySelectBox.append(...createOptionItems({ type: Category, defaultOption: '선택해 주세요' }));
    categoryInput.appendChild(this.createLabel({ targetId: 'category', labelText: '카테고리' }));
    categoryInput.appendChild(categorySelectBox);
    return categoryInput;
  }

  private createDistanceInput(): HTMLDivElement {
    const distanceInput = this.createFormItemContainer({ required: true });
    const distanceSelectBox = this.createSelectBox({ name: 'distanceByWalk', required: true });
    distanceSelectBox.append(...createOptionItems({ type: DistanceByWalk, defaultOption: '선택해 주세요' }));
    distanceInput.appendChild(this.createLabel({ targetId: 'distanceByWalk', labelText: '거리(도보 이동 시간)' }));
    distanceInput.appendChild(distanceSelectBox);
    return distanceInput;
  }

  private createDescriptionInput(): HTMLDivElement {
    const descriptionInput = this.createFormItemContainer({ required: false });
    descriptionInput.appendChild(this.createLabel({ targetId: 'description', labelText: '설명 ' }));
    descriptionInput.appendChild(this.createTextArea({ name: 'description', cols: 30, rows: 5, required: false }));
    descriptionInput.appendChild(this.createCaption({ captionText: '메뉴 등 추가 정보를 입력해 주세요.' }));
    return descriptionInput;
  }

  private createReferenceInput(): HTMLDivElement {
    const referenceInput = this.createFormItemContainer({ required: false });
    referenceInput.appendChild(this.createLabel({ targetId: 'referenceUrl', labelText: '참고 링크' }));
    referenceInput.appendChild(this.createInput({ type: 'url', name: 'referenceUrl', required: false }));
    referenceInput.appendChild(this.createCaption({ captionText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.' }));
    return referenceInput;
  }

  private createButtonContainer(): HTMLDivElement {
    const buttonContainer = this.createFormButtonContainer();
    buttonContainer.appendChild(
      this.createFormButton({
        type: 'button',
        style: 'secondary',
        id: 'cancel-adding-restaurant-button',
        textContent: '취소하기',
      }),
    );
    buttonContainer.appendChild(
      this.createFormButton({
        type: 'submit',
        style: 'primary',
        id: 'submit-adding-restaurant-button',
        textContent: '추가하기',
      }),
    );
    return buttonContainer;
  }

  private createAddRestaurantForm(): HTMLFormElement {
    const form = document.createElement('form');
    form.id = 'add-restaurant-form';

    form.appendChild(this.createNameInput());
    form.appendChild(this.createCategoryInput());
    form.appendChild(this.createDistanceInput());
    form.appendChild(this.createDescriptionInput());
    form.appendChild(this.createReferenceInput());
    form.appendChild(this.createButtonContainer());

    return form;
  }

  private createInput({ type, name, required }: InputElementType): HTMLInputElement {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.id = `restaurant-${name}`;
    input.required = required;
    return input;
  }

  private createTextArea({ name, cols, rows, required }: TextAreaElementType): HTMLTextAreaElement {
    const textArea = document.createElement('textarea');
    textArea.name = name;
    textArea.id = `restaurant-${name}`;
    textArea.cols = cols;
    textArea.rows = rows;
    textArea.required = required;
    return textArea;
  }

  private createLabel({ targetId, labelText }: LabelElementType): HTMLLabelElement {
    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = targetId;
    label.classList.add('text-caption');
    return label;
  }

  private createCaption({ captionText }: CaptionElementType) {
    const caption = document.createElement('span');
    caption.classList.add('help-text', 'text-caption');
    caption.textContent = captionText;
    return caption;
  }

  private createFormItemContainer({ required }: FormItemContainerElementType): HTMLDivElement {
    const formItemContainer = document.createElement('div');
    formItemContainer.classList.add('form-item');
    if (required) {
      formItemContainer.classList.add('form-item--required');
    }
    return formItemContainer;
  }

  private createFormButtonContainer() {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    return buttonContainer;
  }

  private createFormButton({ type, style, id, textContent }: ButtonElementType) {
    const button = document.createElement('button');
    button.type = type;
    button.id = id;
    button.classList.add('button', `button--${style}`, 'text-caption');
    button.textContent = textContent;
    return button;
  }

  private render() {
    const modal = document.createElement('dialog');
    modal.id = 'add-restaurant-modal';
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    modal.appendChild(modalContainer);
    modalContainer.appendChild(this.createModalTitle());
    modalContainer.appendChild(this.createAddRestaurantForm());

    this.appendChild(modal);
  }
}

customElements.define('add-restaurant-modal', AddRestaurantModal);
