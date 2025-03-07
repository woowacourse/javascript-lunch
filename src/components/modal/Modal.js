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

  componentDidMount() {
    this.$backdrop = this.$target.querySelector(".modal-backdrop");
    if (this.$backdrop) {
      this.$backdrop.removeEventListener("click", this.handleClose);
      this.$backdrop.addEventListener("click", this.handleClose);
    }
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      this.initialRender();
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
      this.$target.replaceChildren();
    }
  }
}

export default Modal;
