import Button from './abstract/Button';

class CancelModalButton extends Button {
  constructor($target: Element) {
    super($target);
  }

  addEvent(eventTarget: Element) {
    if (eventTarget.classList.contains('cancel')) {
      this.closeModal();
    }

    return this;
  }
}

export default CancelModalButton;
