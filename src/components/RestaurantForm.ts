import {
  LabelProps,
  OptionProps,
  SelectProps,
  InputProps,
  TextAreaProps,
  CaptionProps,
  ButtonProps,
} from './tag/props';

import { Button } from './tag';

import FormItem from './FormItem';

class RestaurantForm extends HTMLElement {
  constructor() {
    super();
    this.createElements();
  }

  createElements() {
    this.createCategoryField();
    this.createRestaurantNameField();
    this.createDistanceField();
    this.createDescriptionField();
    this.createLinkField();
    this.createButtons();
  }

  createCategoryField() {
    const label: LabelProps = {
      htmlFor: 'category',
      text: '카테고리',
    };
    const options: OptionProps[] = [
      { value: '', text: '선택해 주세요' },
      { value: '한식', text: '한식' },
      { value: '중식', text: '중식' },
      { value: '일식', text: '일식' },
      { value: '양식', text: '양식' },
      { value: '아시안', text: '아시안' },
      { value: '기타', text: '기타' },
    ];
    const select: SelectProps = {
      name: 'category',
      id: 'category',
      required: true,
      options: options,
    };

    this.appendChild(
      new FormItem({
        required: true,
        label,
        select,
      }),
    );
  }

  createRestaurantNameField() {
    const label: LabelProps = {
      htmlFor: 'name',
      text: '이름',
    };

    const input: InputProps = {
      type: 'text',
      name: 'name',
      id: 'name',
      required: true,
    };

    this.appendChild(
      new FormItem({
        required: true,
        label,
        input,
      }),
    );
  }

  createDistanceField() {
    const label: LabelProps = {
      htmlFor: 'distance',
      text: '거리(도보 이동 시간)',
    };
    const options: OptionProps[] = [
      { value: '', text: '선택해 주세요' },
      { value: '5', text: '5분 내' },
      { value: '10', text: '10분 내' },
      { value: '15', text: '15분 내' },
      { value: '20', text: '20분 내' },
      { value: '30', text: '30분 내' },
    ];
    const select: SelectProps = {
      name: 'distance',
      id: 'distance',
      required: true,
      options,
    };

    this.appendChild(
      new FormItem({
        required: true,
        label,
        select,
      }),
    );
  }

  createDescriptionField() {
    const label: LabelProps = {
      htmlFor: 'description',
      text: '설명',
    };

    const textarea: TextAreaProps = {
      name: 'description',
      id: 'description',
      cols: 30,
      rows: 15,
    };

    const caption: CaptionProps = {
      classnames: ['help-text', 'text-caption'],
      text: '메뉴 등 추가 정보를 입력해 주세요.',
    };

    this.appendChild(
      new FormItem({
        required: false,
        label,
        textarea,
        caption,
      }),
    );
  }

  createLinkField() {
    const label: LabelProps = {
      htmlFor: 'link',
      text: '참고 링크',
    };

    const input: InputProps = {
      type: 'text',
      name: 'link',
      id: 'link',
      required: false,
    };

    const caption: CaptionProps = {
      classnames: ['help-text', 'text-caption'],
      text: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    };
    this.appendChild(
      new FormItem({
        required: false,
        label,
        input,
        caption,
      }),
    );
  }

  createButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-container');

    const cancelButton: ButtonProps = {
      type: 'button',
      classnames: ['button', 'button--secondary', 'text-caption', 'modal--close'],
      children: '취소하기',
    };
    const submitButton: ButtonProps = {
      type: 'submit',
      classnames: ['button', 'button--primary', 'text-caption'],
      children: '추가하기',
    };
    buttonContainer.appendChild(new Button(cancelButton));
    buttonContainer.appendChild(new Button(submitButton));

    this.appendChild(buttonContainer);
  }
}

customElements.define('restaurant-form', RestaurantForm);

export default RestaurantForm;
