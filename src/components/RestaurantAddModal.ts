import Component from '../core/Component.ts';
import { InputBox } from './index.ts';
import { Button, Modal } from './common/index.ts';
import type { RestaurantType } from '../lib/types.ts';
import { html, generateId } from '../lib/utils.ts';
import { CATEGORIES, DISTANCES } from '../lib/constants.ts';
import EventHandler from '../lib/EventHandler.ts';

interface RestaurantAddModalProps {
  addRestaurant: (restaurant: RestaurantType) => void;
}

export default class RestaurantAddModal extends Component<null, RestaurantAddModalProps> {
  override onRender() {
    this.appendRestaurantAddModal();
  }

  appendRestaurantAddModal() {
    const inputBoxList = [
      new InputBox({
        input: html` <select name="category" id="category" required>
          <option value="">선택해 주세요</option>
          ${[...CATEGORIES].map((category) => `<option value="${category}">${category}</option>`).join('')}
        </select>`,
        label: '카테고리',
        isRequired: true,
        labelId: 'category',
      }),
      new InputBox({
        input: html`<input type="text" name="name" id="name" maxlength="20" required />`,
        label: '이름',
        isRequired: true,
        labelId: 'name',
      }),
      new InputBox({
        input: html` <select name="distance" id="distance" required>
          <option value="">선택해 주세요</option>
          ${[...DISTANCES].map((distance) => `<option value="${distance}">${distance}분 내</option>`).join('')}
        </select>`,
        label: '거리(도보 이동 시간)',
        isRequired: true,
        labelId: 'distance',
      }),
      new InputBox({
        input: html`<textarea maxlength="1000" name="description" id="description" cols="30" rows="5"></textarea>`,
        label: '설명',
        caption: '메뉴 등 추가 정보를 입력해 주세요.',
        isRequired: false,
        labelId: 'description',
      }),
      new InputBox({
        input: html`<input type="url" name="url" id="url" />`,
        label: '참고 링크',
        caption: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
        isRequired: false,
        labelId: 'url',
      }),
    ];

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

    const modal = new Modal({
      id: 'restaurant-add-modal',
      children: html`
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form data-action="restaurant-add">
          ${inputBoxList.map((input) => html`${input}`).join('')}
          <div class="button-container">${cancelButton} ${addButton}</div>
        </form>
      `,
    });

    this.appendChild(modal.element);
  }

  override attachEventListener() {
    EventHandler.attachEventHandler(
      'submit',
      (_, target) => {
        const id = generateId();

        const formData = new FormData(target as HTMLFormElement);
        const modalInput = { ...Object.fromEntries(formData), id };

        this.props?.addRestaurant(modalInput as unknown as RestaurantType);
      },
      'restaurant-add',
    );
  }
}
