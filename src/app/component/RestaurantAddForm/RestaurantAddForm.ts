import {
  createCaption,
  createFormButton,
  createFormButtonContainer,
  createFormItemContainer,
  createInput,
  createLabel,
  createOptionItems,
  createSelectBox,
  createTextArea,
} from '../../util/createFormElement';
import { RestaurantDataType } from '../../type/restaurantTypes';
import { Category, DistanceByWalk } from '../../enum/enums';
import handleError from '../../util/handleError';
import RestaurantValidator from '../../validator/RestaurantValidator';
import './RestaurantAddForm.css';

type RestaurantAddFormType = {
  parentComponent: object;
  onCancel: () => void;
  onSubmit: (data: RestaurantDataType) => void;
};

export default class RestaurantAddForm {
  private form: HTMLFormElement;
  private cancelSubmitFormData: Function;
  private submitFormData: Function;
  private cancelButton: HTMLButtonElement;
  private submitButton: HTMLButtonElement;

  constructor({ onCancel, onSubmit }: RestaurantAddFormType) {
    this.cancelButton = createFormButton({
      type: 'button',
      style: 'secondary',
      id: 'cancel-adding-restaurant-button',
      textContent: '취소하기',
    });
    this.submitButton = createFormButton({
      type: 'submit',
      style: 'primary',
      id: 'submit-adding-restaurant-button',
      textContent: '추가하기',
    });
    this.form = this.createAddRestaurantForm();
    this.cancelSubmitFormData = onCancel;
    this.submitFormData = onSubmit;
    this.addEvent();
  }

  render() {
    return this.form;
  }

  private addEvent() {
    this.cancelButton.addEventListener('click', this.handleCancel.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private clearForm() {
    this.form.reset();
  }

  private handleCancel() {
    this.clearForm();
    this.cancelSubmitFormData();
  }

  private handleSubmit(event: Event) {
    try {
      event.preventDefault();
      const restaurantData = this.handleFormData(new FormData(event.target as HTMLFormElement));
      RestaurantValidator.validateUserInput(restaurantData);
      this.clearForm();
      this.submitFormData(restaurantData);
    } catch (error) {
      handleError(error);
    }
  }

  private handleFormData(formData: FormData): RestaurantDataType {
    const formDataEntries = Object.fromEntries(formData.entries());
    if (this.isRestaurantData(formDataEntries)) {
      return formDataEntries;
    }
    throw new Error('입력된 음식점 정보가 올바르지 않습니다. 새로고침 후 다시 입력해주세요.');
  }

  private isRestaurantData(object: any): object is RestaurantDataType {
    return (
      'name' in object &&
      'category' in object &&
      Object.values(Category).includes(object.category) &&
      'distanceByWalk' in object &&
      Object.values(DistanceByWalk).includes(object.distanceByWalk)
    );
  }

  private createNameInput() {
    const nameInput = createFormItemContainer({ required: true });
    nameInput.appendChild(createLabel({ targetId: 'name', labelText: '이름' }));
    nameInput.appendChild(createInput({ type: 'text', name: 'name', required: true }));
    return nameInput;
  }

  private createCategoryInput() {
    const categoryInput = createFormItemContainer({ required: true });
    const categorySelectBox = createSelectBox({ name: 'category', required: true });
    categorySelectBox.append(...createOptionItems({ type: Category, defaultOption: '선택해 주세요' }));
    categoryInput.appendChild(createLabel({ targetId: 'category', labelText: '카테고리' }));
    categoryInput.appendChild(categorySelectBox);
    return categoryInput;
  }

  private createDistanceInput() {
    const distanceInput = createFormItemContainer({ required: true });
    const distanceSelectBox = createSelectBox({ name: 'distanceByWalk', required: true });
    distanceSelectBox.append(...createOptionItems({ type: DistanceByWalk, defaultOption: '선택해 주세요' }));
    distanceInput.appendChild(createLabel({ targetId: 'distanceByWalk', labelText: '거리(도보 이동 시간)' }));
    distanceInput.appendChild(distanceSelectBox);
    return distanceInput;
  }

  private createDescriptionInput() {
    const descriptionInput = createFormItemContainer({ required: false });
    descriptionInput.appendChild(createLabel({ targetId: 'description', labelText: '설명 ' }));
    descriptionInput.appendChild(createTextArea({ name: 'description', cols: 30, rows: 5, required: false }));
    descriptionInput.appendChild(createCaption({ captionText: '메뉴 등 추가 정보를 입력해 주세요.' }));
    return descriptionInput;
  }

  private createReferenceInput() {
    const referenceInput = createFormItemContainer({ required: false });
    referenceInput.appendChild(createLabel({ targetId: 'referenceUrl', labelText: '참고 링크' }));
    referenceInput.appendChild(createInput({ type: 'url', name: 'referenceUrl', required: false }));
    referenceInput.appendChild(createCaption({ captionText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.' }));
    return referenceInput;
  }

  private createButtonContainer() {
    const buttonContainer = createFormButtonContainer();
    buttonContainer.append(this.cancelButton, this.submitButton);
    return buttonContainer;
  }

  private createAddRestaurantForm() {
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
}
