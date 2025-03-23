import Button from './Button.js';
import Component from '../core/Component.js';
import InputBox from './InputBox.js';
import { FOOD_CATEGORY } from '../constants/constants.js';
import Select from './Select.js';
import Modal from './Modal.js';

class InputModal extends Component {
  template() {
    const inputBoxList = [
      new InputBox({
        input: new Select({
          name: 'category',
          optionList: ['한식', '중식', '일식', '양식', '아시안', '기타'],
        }).template(),
        section: 'category',
        label: '카테고리',
        isRequired: true,
      }),
      new InputBox({
        input: `<input type="text" name="name" id="name" maxlength='20' required />`,
        section: 'name',
        label: '이름',
        isRequired: true,
      }),
      new InputBox({
        input: new Select({
          name: 'distance',
          optionList: [5, 10, 15, 20, 30],
        }).template(),
        section: 'distance',
        label: '거리(도보 이동 시간)',
        isRequired: true,
      }),
      new InputBox({
        input: `<textarea maxlength='1000' name="description" id="description" cols="30" rows="5"></textarea>`,
        section: 'description',
        label: '설명',
        caption: '메뉴 등 추가 정보를 입력해 주세요.',
        isRequired: false,
      }),
      new InputBox({
        input: `<input type="url" name="link" id="link" />`,
        section: 'link',
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
    const addButtom = new Button({
      type: 'submit',
      class: 'button--primary',
      id: 'modal-add',
      message: '추가하기',
    });
    return `
             ${new Modal({
               content: `
               <h2 class="modal-title text-title">새로운 음식점</h2>
                <form class="modal-form">
                  ${inputBoxList.map((input) => input.template()).join('')}
                  <div class="button-container">
                    ${cancelButton.template()}
                    ${addButtom.template()}
                  </div>
                </form>`,
             }).template()}
        `;
  }

  onRender() {
    const $modalCancelButton = this.element.querySelector('#modal-cancel');
    const $modalBackdrop = this.element.querySelector('.modal-backdrop');

    $modalCancelButton.addEventListener('click', () => {
      this.element.classList.add('hidden');
    });
    $modalBackdrop.addEventListener('click', () => {
      this.element.classList.add('hidden');
    });

    const $addRestaurantButton = this.parent.querySelector('.gnb__button');

    $addRestaurantButton.addEventListener('click', () => {
      this.element.classList.remove('hidden');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.element.classList.add('hidden');
    });

    const $modalForm = this.element.querySelector('.modal-form');

    $modalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const $categoryInput = this.element.querySelector('#category');
      const $name = this.element.querySelector('#name');
      const $distance = this.element.querySelector('#distance');
      const $description = this.element.querySelector('#description');
      const $link = this.element.querySelector('#link');

      const modalInput = {
        id: Date.now(),
        imgUrl: `../../public/images/category-${FOOD_CATEGORY[$categoryInput.value]}.png`,
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

export default InputModal;
