import ADD_BUTTON_IMAGE from '../../assets/images/add-button.png';

import Component from '../Component';
import { EventInfo } from '../../types/component';
import { $ } from '../../utils/dom';

class ModalOpenButton extends Component {
  protected setTemplateId() {
    return '#modal-open-button-template';
  }

  protected setEvents(): EventInfo[] {
    return [];
  }

  protected render() {
    const $img = $('img', this.component);
    $img?.setAttribute('src', ADD_BUTTON_IMAGE);
    this.appendChild(this.component);
  }
}

customElements.define('modal-open-button', ModalOpenButton);
