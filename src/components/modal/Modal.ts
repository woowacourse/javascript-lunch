import Component from '../core/Component';

import dom from '@/utils/dom';

class Modal<T> extends Component<T> {
  setEvent() {
    const $modalBackdrop = dom.getTargetElement(this.$target, '.modal-backdrop');
    $modalBackdrop.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    this.$target.classList.toggle('modal--open');
  }
}

export default Modal;
