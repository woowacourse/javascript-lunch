import Component from '../core/Component';

import dom from '@/utils/dom';

class Modal<T> extends Component<T> {
  setEvent() {
    const $modalBackdrop = this.$target.querySelector('.modal-backdrop');
    if ($modalBackdrop === null) return;
    $modalBackdrop.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    this.$target.classList.toggle('modal--open');
  }

  handleCloseResetModal() {
    dom.getElement('.modal').classList.remove('modal--open');
    dom.getElement('#error-link').classList.add('hidden');
    const $form = dom.getElement('form') as HTMLFormElement;
    $form.reset();
  }
}

export default Modal;
