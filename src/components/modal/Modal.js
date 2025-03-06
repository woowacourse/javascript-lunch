import Component from "../core/Component.js";

class Modal extends Component {
  setup() {
    this.state = {
      isOpen: false,
    };
  }

  contents() {
    return "";
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      this.initialRender();
      this.$target
        .querySelector(".modal-backdrop")
        .addEventListener("click", () => this.close());
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
