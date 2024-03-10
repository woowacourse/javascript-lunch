import '../../styles/modalOpenButton.css';

import ADD_BUTTON_IMAGE from '../../assets/images/add-button.png';

import Component from '../Component';
import { EventInfo } from '../../types/component';

class ModalOpenButton extends Component {
  protected setTemplate() {
    return `
      <template>
        <button type="button" class="modal-open-button" aria-label="음식점 추가">
          <img src=${ADD_BUTTON_IMAGE} alt="음식점 추가">
        </button>
      </template>`;
  }

  protected setEvents(): EventInfo[] {
    return [];
  }

  protected render() {
    this.appendChild(this.component);
  }
}

customElements.define('modal-open-button', ModalOpenButton);
