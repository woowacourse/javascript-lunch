import restaurantAPI from '../domain/restaurantAPI';
import { CategoryValues, RestaurantInfo } from '../types/types';
import { $ } from '../util/dom';
import FormItemComponent from './FormItemComponent';
import InputComponent from './InputComponent';
import TextareaComponent from './TextareaComponent';
import SelectComponent from './common/SelectComponent';
import restaurantInfoValidator from '../validator/restaurantInfoValidator';
import ButtonComponent from './common/ButtonComponent';

export function ModalComponent() {
  const buttonComponent = new ButtonComponent();

  const getTemplate = () => {
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form>
            ${
              FormItemComponent({
                labelText: '카테고리',
                label: 'category',
                children: new SelectComponent({
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
                }).getTemplate()
              }).getTemplate().firstElementChild!.outerHTML
            }

            ${
              FormItemComponent({
                labelText: '이름',
                label: 'name',
                children: InputComponent({
                  type: 'text',
                  name: 'name',
                  id: 'name',
                  required: true,
                  className: 'custom-input'
                }).getTemplate()
              }).getTemplate().firstElementChild!.outerHTML
            }

            ${
              FormItemComponent({
                labelText: '거리(도보 이동 시간)',
                label: 'distance',
                children: new SelectComponent({
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
                }).getTemplate()
              }).getTemplate().firstElementChild!.outerHTML
            }

            ${
              FormItemComponent({
                labelText: '설명',
                label: 'description',
                isRequired: false,
                children: TextareaComponent({
                  name: 'description',
                  id: 'description',
                  cols: 30,
                  rows: 5,
                  className: 'custom-textarea'
                }).getTemplate()
              }).getTemplate().firstElementChild!.outerHTML
            }

            ${
              FormItemComponent({
                labelText: '참고 링크',
                label: 'link',
                isRequired: false,
                children: InputComponent({
                  type: 'url',
                  name: 'link',
                  id: 'link',
                  className: 'custom-input'
                }).getTemplate()
              }).getTemplate().firstElementChild!.outerHTML
            }

            <div class="button-container">
              <button id="cancelButton" type="button" class="button button--secondary text-caption">취소하기</button>
              <button id="submitButton" class="button button--primary text-caption" disabled>추가하기</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const node = template.content;
    return node;
  };

  const setEvent = (): void => {
    const form = $('.modal-container form') as Element;
    form.addEventListener('input', checkRequiredFields);

    handleCancelButtonClick();
    handleAddButtonClick();
    handleModalBackDropClick();
  };

  const handleCancelButtonClick = () => {
    const cancelButton = $('#cancelButton') as HTMLButtonElement;
    cancelButton.addEventListener('click', () => {
      const modal = $('.modal') as HTMLElement;
      modal.classList.remove('modal--open');
    });
  };

  const handleModalBackDropClick = () => {
    const modalBackdrop = document.querySelector('.modal-backdrop') as HTMLButtonElement;
    modalBackdrop.addEventListener('click', () => {
      const modal = $('.modal') as HTMLElement;
      modal.classList.remove('modal--open');
    });
  };

  const handleAddButtonClick = () => {
    const addButton = $('#submitButton') as HTMLButtonElement;

    addButton.addEventListener('click', (event) => {
      if (addButton.disabled) {
        addButton.classList.remove('button--primary');
        event.preventDefault();
        return;
      }
      addButton.classList.add('button--primary');
      getValue();
    });
  };

  const getValue = (): RestaurantInfo | undefined => {
    const categoryValue = ($('#category') as HTMLSelectElement).value;
    const nameValue = ($('#name') as HTMLInputElement).value;
    const distanceValue = ($('#distance') as HTMLSelectElement).value;
    const descriptionValue = ($('#description') as HTMLTextAreaElement).value;
    const linkValue = ($('#link') as HTMLInputElement).value;

    const modalValues: RestaurantInfo = {
      category: categoryValue as CategoryValues,
      name: nameValue,
      distance: Number(distanceValue),
      description: descriptionValue,
      link: linkValue
    };

    const isNameValid = restaurantInfoValidator.checkRestaurantName(nameValue);
    const isDescriptionValid = restaurantInfoValidator.checkRestaurantDescription(descriptionValue);

    if (!isNameValid) {
      const nameField = document.getElementById('name') as HTMLInputElement;
      nameField.focus();
      return;
    }

    if (!isDescriptionValid) {
      const descriptionField = document.getElementById('description') as HTMLTextAreaElement;
      descriptionField.focus();
      return;
    }

    restaurantAPI.save(modalValues);

    return modalValues;
  };

  const checkRequiredFields = () => {
    const categoryValue = ($('#category') as HTMLSelectElement).value;
    const nameValue = ($('#name') as HTMLInputElement).value;
    const distanceValue = ($('#distance') as HTMLSelectElement).value;
    const descriptionValue = ($('#description') as HTMLTextAreaElement).value;

    const isNameValid = restaurantInfoValidator.checkRestaurantName(nameValue);
    const isDescriptionValid = restaurantInfoValidator.checkRestaurantDescription(descriptionValue);

    const hasEmptyValue =
      !categoryValue || !nameValue || !distanceValue || !isNameValid || !isDescriptionValid;

    const addButton = $('#submitButton') as HTMLButtonElement;
    addButton.disabled = hasEmptyValue;
  };

  return {
    getTemplate,
    setEvent,
    getValue
  };
}
