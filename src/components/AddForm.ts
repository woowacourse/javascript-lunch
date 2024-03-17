import restaurantAPI from '../domain/restaurantAPI';
import { CategoryValues, RestaurantInfo } from '../types/types';
import { $ } from '../util/dom';
import restaurantInfoValidator from '../validator/restaurantInfoValidator';
import FormItemComponent from './FormItemComponent';
import InputComponent from './InputComponent';
import TextareaComponent from './TextareaComponent';
import ButtonComponent from './common/ButtonComponent';
import SelectComponent from './common/SelectComponent';

const AddForm = () => {
  const form = document.createElement('form');

  const categoryForm = FormItemComponent({
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

  const nameForm = FormItemComponent({
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

  const distanceForm = FormItemComponent({
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

  const descriptionForm = FormItemComponent({
    labelText: '설명',
    label: 'description',
    isRequired: false,
    children: TextareaComponent({
      name: 'description',
      id: 'description'
    }).create()
  }).create();

  const linkForm = FormItemComponent({
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

  [categoryForm, nameForm, distanceForm, descriptionForm, linkForm, buttonContainer].forEach(
    (element) => form.appendChild(element)
  );

  const getValue = () => {
    const category = form.querySelector('#category') as HTMLSelectElement;
    const name = form.querySelector('#name') as HTMLInputElement;
    const distance = form.querySelector('#distance') as HTMLInputElement;
    const description = form.querySelector('#description') as HTMLTextAreaElement;
    const link = form.querySelector('#link') as HTMLInputElement;

    const restaurantInfo: RestaurantInfo = {
      category: category.value as CategoryValues,
      name: name.value,
      distance: Number(distance.value),
      isFavorite: false,
      description: description.value,
      link: link.value
    };

    return restaurantInfo;
  };

  const checkRequiredFields = () => {
    const { category, name, distance, description, link } = getValue();

    const isNameValid = restaurantInfoValidator.checkRestaurantName(name);
    const isDescriptionValid = description
      ? restaurantInfoValidator.checkRestaurantDescription(description)
      : true;

    const hasEmptyValue = !category || !name || !distance || !isNameValid || !isDescriptionValid;

    const addButton = $('#submitButton') as HTMLButtonElement;
    addButton.disabled = hasEmptyValue;
  };

  const handleSubmit = (event: Event) => {
    const info = getValue();
    restaurantAPI.save(info);
    const modal = $('.modal') as HTMLElement;
    modal.classList.remove('modal--open');
  };

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', checkRequiredFields);

  cancelButton.addEventListener('click', () => {
    const modal = $('.modal') as HTMLElement;
    modal.classList.remove('modal--open');
  });

  const create = () => form;

  return {
    create
  };
};

export default AddForm;
