import Component from '../core/Component';

import dom from '@/utils/dom';

class Modal<T> extends Component<T> {
  setEvent() {
    const $modalBackdrop = dom.getTargetElement(this.$target, '.modal-backdrop');
    $modalBackdrop.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    document.body.style.overflow = 'unset';
    this.$target.classList.toggle('modal--open');
    if (this.$target.classList.contains('modal--open')) document.body.style.overflow = 'hidden';
  }
}

export default Modal;
