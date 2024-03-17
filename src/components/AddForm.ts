import restaurantAPI from '../domain/restaurantAPI';
import { CategoryValues, RestaurantInfo } from '../types/types';
import restaurantInfoValidator from '../validator/restaurantInfoValidator';
import FormItemComponent from './FormItemComponent';
import InputComponent from './InputComponent';
import TextareaComponent from './TextareaComponent';
import ButtonComponent from './common/ButtonComponent';
import SelectComponent from './common/SelectComponent';

const AddForm = () => {
  const form = document.createElement('form');

  const createCategoryForm = () => {
    return FormItemComponent({
      labelText: '카테고리',
      label: 'category',
      children: SelectComponent({
        name: 'category',
        id: 'category',
        required: true,
        className: 'custom-select',
        options: [
          { value: '', label: '선택해 주세요' },
          { value: '한식', label: '한식' },
          { value: '중식', label: '중식' },
          { value: '일식', label: '일식' },
          { value: '양식', label: '양식' },
          { value: '아시안', label: '아시안' },
          { value: '기타', label: '기타' }
        ]
      }).create()
    }).create();
  };

  const createNameForm = () => {
    return FormItemComponent({
      labelText: '이름',
      label: 'name',
      children: InputComponent({
        type: 'text',
        name: 'name',
        id: 'name',
        required: true,
        className: 'custom-input'
      }).create()
    }).create();
  };

  const createDistanceForm = () => {
    return FormItemComponent({
      labelText: '거리(도보 이동 시간)',
      label: 'distance',
      children: SelectComponent({
        name: 'distance',
        id: 'distance',
        required: true,
        className: 'custom-select',
        options: [
          { value: '', label: '선택해 주세요' },
          { value: '5', label: '5분 내' },
          { value: '10', label: '10분 내' },
          { value: '15', label: '15분 내' },
          { value: '20', label: '20분 내' },
          { value: '30', label: '30분 내' }
        ]
      }).create()
    }).create();
  };

  const createDescriptionForm = () => {
    return FormItemComponent({
      labelText: '설명',
      label: 'description',
      isRequired: false,
      children: TextareaComponent({
        name: 'description',
        id: 'description'
      }).create()
    }).create();
  };

  const createLinkForm = () => {
    return FormItemComponent({
      labelText: '참고 링크',
      label: 'link',
      isRequired: false,
      children: InputComponent({
        type: 'url',
        name: 'link',
        id: 'link',
        className: 'custom-input'
      }).create()
    }).create();
  };

  const createButtonContainer = () => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const cancelButton = ButtonComponent({
      id: 'cancelButton',
      text: '닫기',
      variant: 'secondary',
      type: 'button'
    }).create();

    const submitButton = ButtonComponent({
      id: 'submitButton',
      text: '등록하기',
      variant: 'primary',
      isDisabled: true
    }).create();

    [cancelButton, submitButton].forEach((element) => buttonContainer.appendChild(element));

    return buttonContainer;
  };

  const appendFormElements = () => {
    const formElements = [
      createCategoryForm(),
      createNameForm(),
      createDistanceForm(),
      createDescriptionForm(),
      createLinkForm(),
      createButtonContainer()
    ];

    formElements.forEach((element) => form.appendChild(element));
  };

  const getValue = (): RestaurantInfo | undefined => {
    const categoryElement = form.querySelector('#category');
    const nameElement = form.querySelector('#name');
    const distanceElement = form.querySelector('#distance');
    const descriptionElement = form.querySelector('#description');
    const linkElement = form.querySelector('#link');

    if (
      categoryElement instanceof HTMLSelectElement &&
      nameElement instanceof HTMLInputElement &&
      distanceElement instanceof HTMLSelectElement &&
      descriptionElement instanceof HTMLTextAreaElement &&
      linkElement instanceof HTMLInputElement
    ) {
      const category = categoryElement.value as CategoryValues;
      const name = nameElement.value;
      const distance = Number(distanceElement.value);
      const description = descriptionElement.value;
      const link = linkElement.value;

      return {
        category,
        name,
        distance,
        isFavorite: false,
        description,
        link
      };
    }

    throw new Error('Form elements가 예상 타입과 다르다.');
  };

  const checkRequiredFields = () => {
    const restaurantInfo = getValue();

    if (restaurantInfo) {
      const { category, name, distance, description } = restaurantInfo;

      const isNameValid = restaurantInfoValidator.checkRestaurantName(name);
      const isDescriptionValid = description
        ? restaurantInfoValidator.checkRestaurantDescription(description)
        : true;

      const hasEmptyValue = !category || !name || !distance || !isNameValid || !isDescriptionValid;

      const submitButton = form.querySelector('#submitButton') as HTMLButtonElement;
      submitButton.disabled = hasEmptyValue;
    }
  };

  const handleSubmit = () => {
    const restaurantInfo = getValue();
    if (restaurantInfo) {
      restaurantAPI.save(restaurantInfo);
    }

    closeModal();
  };

  const closeModal = () => {
    const modal = document.querySelector('.modal') as HTMLElement;
    modal.classList.remove('modal--open');
  };

  const addEventListeners = () => {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', checkRequiredFields);

    const cancelButton = form.querySelector('#cancelButton') as HTMLButtonElement;
    cancelButton.addEventListener('click', closeModal);
  };

  const create = () => {
    appendFormElements();
    addEventListeners();
    return form;
  };

  return {
    create
  };
};

export default AddForm;
