import Button from './common/Button.js';
import Component from '../core/Component.js';
import Modal from './common/Modal.js';
import { BUTTON_TEXT, FOOD_CATEGORY, INPUT_FIELDS } from '../constants/constants.js';
import { inputBoxList } from '../config/InputBoxList.js';

class InputModal extends Component {
  getModalInput(modalForm) {
    const baseURL = window.location.origin.includes('github.io') ? '/javascript-lunch' : '../..';
    const formData = new FormData(modalForm);
    const modalInput = {
      id: Date.now(),
      imgUrl: `${baseURL}/public/images/category-${FOOD_CATEGORY[formData.get(INPUT_FIELDS.CATEGORY)]}.png`,
      category: formData.get(INPUT_FIELDS.CATEGORY),
      name: formData.get(INPUT_FIELDS.NAME),
      distance: formData.get(INPUT_FIELDS.DISTANCE),
      description: formData.get(INPUT_FIELDS.DESCRIPTION),
      link: formData.get(INPUT_FIELDS.LINK),
    };
    return modalInput;
  }

  onRender() {
    const cancelButton = new Button({
      type: 'button',
      class: 'button--secondary',
      id: 'modal-cancel',
      message: BUTTON_TEXT.CANCLE,
    });
    const addButtom = new Button({
      type: 'submit',
      class: 'button--primary',
      id: 'modal-add',
      message: BUTTON_TEXT.ADD,
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
        </form>
      `,
    });

    this.element.appendChild(modal.element);

    const $modalForm = this.element.querySelector('.modal-form');
    $modalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const modalInput = this.getModalInput($modalForm);
      this.props.addRestaurant(modalInput);
    });
  }
}

export default InputModal;
