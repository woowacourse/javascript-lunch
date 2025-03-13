import Component from "../core/Component.js";
import { $ } from "../../utils/selector.js";

class Modal extends Component {
  setup() {
    this.state = {
      isOpen: false,
    };
    this.closeModalByClick = this.close.bind(this);
  }

  contents() {
    return "";
  }

  componentDidMount() {
    this.$backdrop = $(document, ".modal-backdrop");
    if (this.$backdrop) {
      this.$backdrop.removeEventListener("click", this.closeModalByClick);
      this.$backdrop.addEventListener("click", this.closeModalByClick);
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
