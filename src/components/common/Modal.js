import Component from '../../core/Component';

class Modal extends Component {
  template() {
    return `
      <div class="modal modal--open hidden">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            ${this.props.content}
        </div>
      </div>
    `;
  }

  onRender() {
    document.addEventListener('click', (event) => {
      if (event.target.closest('.modal-backdrop')) this.element.classList.add('hidden');
    });

    document.addEventListener('click', (event) => {
      if (event.target.closest('#modal-cancel')) this.element.classList.add('hidden');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.element.classList.add('hidden');
    });
  }
}

export default Modal;
