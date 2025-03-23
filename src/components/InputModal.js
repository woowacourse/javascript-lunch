import Button from './Button.js';
import Component from '../core/Component.js';
import Modal from './Modal.js';
import { FOOD_CATEGORY } from '../constants/constants.js';
import { inputBoxList } from '../config/InputBoxList.js';

class InputModal extends Component {
  onRender() {
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
    const modal = new Modal({
      content: `
      <h2 class="modal-title text-title">새로운 음식점</h2>
       <form class="modal-form">
         ${inputBoxList.map((input) => input.template()).join('')}
         <div class="button-container">
           ${cancelButton.template()}
           ${addButtom.template()}
         </div>
       </form>`,
    });

    this.element.appendChild(modal.element);

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
