import Button from './Button.js';
import Component from '../core/Component.js';
import InputBox from './InputBox.js';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  template() {
    const inputBoxList = [
      new InputBox({
        input: `
          <select name="category" id="category" required>
            <option value="">선택해 주세요</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="기타">기타</option>
          </select>`,
        label: '카테고리',
        isRequired: true,
      }),
      new InputBox({
        input: `<input type="text" name="name" id="name" maxlength='20' required />`,
        label: '이름',
        isRequired: true,
      }),
      new InputBox({
        input: `
        <select name="distance" id="distance" required>
          <option value="">선택해 주세요</option>
          <option value="5">5분 내</option>
          <option value="10">10분 내</option>
          <option value="15">15분 내</option>
          <option value="20">20분 내</option>
          <option value="30">30분 내</option>
        </select>`,
        label: '거리(도보 이동 시간)',
        isRequired: true,
      }),
      new InputBox({
        input: `<textarea maxlength='1000' name="description" id="description" cols="30" rows="5"></textarea>`,
        label: '설명',
        caption: '메뉴 등 추가 정보를 입력해 주세요.',
        isRequired: false,
      }),
      new InputBox({
        input: `<input type="url" name="link" id="link" />`,
        label: '참고 링크',
        caption: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
        isRequired: false,
      }),
    ];

    const cancelButton = new Button({
      type: 'button',
      class: 'button--secondary',
      id: 'modal-cancel',
      message: '취소하기',
    });

    const addButton = new Button({
      type: 'submit',
      class: 'button--primary',
      id: 'modal-add',
      message: '추가하기',
    });

    return `
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">${this.props.modalTitle}</h2>
          <form>
            ${inputBoxList.map((input) => input.template()).join('')}
            <div class="button-container">
              ${cancelButton.template()}
              ${addButton.template()}
            </div>
          </form>
        </div>
      </div>
    `;
  }

  onRender() {
    const form = this.element.querySelector('form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const $categoryInput = this.element.querySelector('#category');
      const $name = this.element.querySelector('#name');
      const $distance = this.element.querySelector('#distance');
      const $description = this.element.querySelector('#description');
      const $link = this.element.querySelector('#link');

      const modalInput = {
        category: $categoryInput.value,
        name: $name.value,
        distance: $distance.value,
        description: $description.value,
        link: $link.value,
      };

      this.props.addRestaurant(modalInput);
    });
  }
}

export default Modal;
