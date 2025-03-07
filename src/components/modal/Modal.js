import Component from "../core/Component.js";

class Modal extends Component {
  setup() {
    this.state = {
      isOpen: false,
    };
    this.handleClose = this.close.bind(this);
  }

  contents() {
    return "";
  }

  addEvent(eventType, callback) {
    this.$target.addEventListener(eventType, (event) => callback(event));
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      this.initialRender();
      this.$target
        .querySelector(".modal-backdrop")
        .addEventListener("click", this.handleClose);
    }
  }

  template() {
    if (!this.state.isOpen) return "";
    return /* html */ `
      <div class="modal" data-testid="modal">
        <div class="modal-backdrop" data-testid="modal-backdrop"></div>
        <div id="modal-container" class="modal-container">
          ${this.contents()}
        </div>
      </div>
    `;
  }

  open() {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  }

  close() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
      this.destroy();
    }
  }

  componentWillUnmount() {
    this.$target
      .querySelector(".modal-backdrop")
      .removeEventListener("click", this.handleClose);
  }
}

export default Modal;
