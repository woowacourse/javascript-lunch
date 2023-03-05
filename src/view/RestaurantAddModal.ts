import { $ } from '../util/querySelector';
import FormInput from './form/FormInput';
import FormSelect from './form/FormSelect';
import FormTextArea from './form/FormTextArea';
import FormButtonPack from './form/FormButtonPack';
import getFormData from '../util/getFormData';
import { Restaurant } from '../type';

type RestaurantAddModalType = {
  parentElement: HTMLElement;
  info: {
    modalId: string;
    modalFormId: string;
    modalTitle: string;
  };
  parentEvent: {
    onModalAddButtonClicked: (restaurantData: Restaurant) => void;
    onToggleVisibilityEvent: () => void;
  };
};

class RestaurantAddModal {
  #parentElement;
  #info;
  #parentEvent;

  constructor({ parentElement, info, parentEvent }: RestaurantAddModalType) {
    this.#parentElement = parentElement;
    this.#info = info;
    this.#parentEvent = parentEvent;
    this.#render();
    this.#renderChild();
  }

  toggleVisibility() {
    $(`#${this.#info.modalId}`).classList.toggle('modal--open');
  }

  #onModalCancelButtonClicked() {
    this.toggleVisibility();
  }

  #onModalAddButtonClicked() {
    console.log('Add Clicked - Modal');
    this.toggleVisibility();
    const restaurantData = getFormData(
      $(`#${this.#info.modalFormId}`) as HTMLFormElement
    );

    console.log({ data: restaurantData });
    this.#parentEvent.onModalAddButtonClicked(restaurantData as Restaurant);
  }

  #render() {
    const element = `
      <div class="modal" id="${this.#info.modalId}">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">${this.#info.modalTitle}</h2>
          <form id="${this.#info.modalFormId}"></form>
        </div>
      </div>`;

    if (this.#parentElement) {
      this.#parentElement.insertAdjacentHTML(
        'beforeEnd' as InsertPosition,
        element
      );
    }
  }

  #renderChild() {
    new FormSelect({
      parentElement: $(`#${this.#info.modalFormId}`) as HTMLElement,
      info: {
        id: 'category-filter',
        name: 'category',
        title: '카테고리',
        choices: [
          { value: '전체', displayName: '전체' },
          { value: '한식', displayName: '한식' },
          { value: '중식', displayName: '중식' },
          { value: '일식', displayName: '일식' },
          { value: '양식', displayName: '양식' },
          { value: '아시안', displayName: '아시안' },
          { value: '기타', displayName: '기타' },
        ],
      },
    });

    new FormInput({
      parentElement: $(`#${this.#info.modalFormId}`) as HTMLElement,
      info: {
        id: 'name',
        name: 'name',
        title: '이름',
        isRequired: true,
        hasDescription: false,
      },
    });

    new FormSelect({
      parentElement: $(`#${this.#info.modalFormId}`) as HTMLElement,
      info: {
        id: 'distance',
        name: 'distance',
        title: '거리(도보 이동 시간)',
        choices: [
          { value: '5', displayName: '5분 내' },
          { value: '10', displayName: '10분 내' },
          { value: '15', displayName: '15분 내' },
          { value: '20', displayName: '20분 내' },
          { value: '25', displayName: '25분 내' },
          { value: '30', displayName: '30분 내' },
        ],
      },
    });

    new FormTextArea({
      parentElement: $(`#${this.#info.modalFormId}`) as HTMLElement,
      info: {
        id: 'description',
        name: 'description',
        title: '설명',
        isRequired: false,
        hasDescription: true,
        description: '메뉴 등 추가 정보를 입력해 주세요.',
        cols: 30,
        rows: 5,
      },
    });

    new FormInput({
      parentElement: $(`#${this.#info.modalFormId}`) as HTMLElement,
      info: {
        id: 'link',
        name: 'link',
        title: '참고 링크',
        isRequired: false,
        hasDescription: true,
        description: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
      },
    });

    new FormButtonPack({
      parentElement: $(`#${this.#info.modalFormId}`) as HTMLElement,
      event: {
        onCancel: () => {
          this.#onModalCancelButtonClicked();
        },
        onAdd: () => {
          this.#onModalAddButtonClicked();
        },
      },
      info: {
        cancelButtonId: 'modal-cancel-button',
        addButtonId: 'modal-add-button',
        cancelButtonDisplayName: '취소하기',
        addButtonDisplayName: '추가하기',
      },
    });
  }
}

export default RestaurantAddModal;
