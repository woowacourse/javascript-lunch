import { CATEGORIES, DISTANCES } from '@/lib/constants.ts';
import type { HTMLType } from '@/lib/types.ts';
import { html } from '@/lib/utils.ts';
import { forEach } from '@fxts/core';
import { Button, Input, Select } from './common/index.ts';
import TextArea from './common/TextArea.ts';
import { Component } from './core/index.ts';
import { InputBox } from './index.ts';

interface RestaurantAddModalProps {}

export default class RestaurantAddModal extends Component<RestaurantAddModalProps> {
  template(): HTMLType {
    return html`
      <form data-action="restaurant-create">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <section class="inputs"></section>
        <section class="buttons"></section>
      </form>
    `;
  }

  override onRender() {
    this.appendInputBoxs();
    this.appendButtons();
  }

  appendInputBoxs() {
    const inputBoxList = [
      new InputBox({
        input: new Select({
          options: [
            { value: '', label: '선택해주세요' },
            ...CATEGORIES.map((category) => ({ value: category, label: category })),
          ],
          selected: '',
          dataAction: 'category',
          required: true,
        }).element,
        label: '카테고리',
        isRequired: true,
        labelId: 'category',
      }),
      new InputBox({
        input: new Input({
          type: 'text',
          name: 'name',
          id: 'name',
          maxlength: 20,
          required: true,
          dataAction: 'name',
        }).element,
        label: '이름',
        isRequired: true,
        labelId: 'name',
      }),
      new InputBox({
        input: new Select({
          options: [
            { value: '', label: '선택해주세요' },
            ...DISTANCES.map((distance) => ({ value: distance, label: distance })),
          ],
          selected: '',
          dataAction: 'distance',
          required: true,
        }).element,
        label: '거리(도보 이동 시간)',
        isRequired: true,
        labelId: 'distance',
      }),
      new InputBox({
        input: new TextArea({
          name: 'description',
          id: 'description',
          maxlength: 1000,
          required: false,
          cols: 30,
          rows: 5,
          dataAction: 'description',
        }).element,
        label: '설명',
        caption: '메뉴 등 추가 정보를 입력해 주세요.',
        isRequired: false,
        labelId: 'description',
      }),
      new InputBox({
        input: new Input({
          type: 'url',
          name: 'url',
          id: 'url',
          required: false,
          dataAction: 'url',
        }).element,
        label: '참고 링크',
        caption: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
        isRequired: false,
        labelId: 'url',
      }),
    ];

    forEach((inputBox) => this.appendChild(inputBox.element, '.inputs'), inputBoxList);
  }

  appendButtons() {
    const cancelButton = new Button({
      type: 'button',
      class: 'button--secondary',
      message: '취소하기',
      dataAction: 'modal-cancel',
    });

    const addButton = new Button({
      type: 'submit',
      class: 'button--primary',
      message: '추가하기',
      dataAction: 'modal-add',
    });

    this.appendChild(cancelButton.element, '.buttons');
    this.appendChild(addButton.element, '.buttons');
  }
}
