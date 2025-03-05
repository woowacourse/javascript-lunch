import Component from "../core/Component.js";

class Modal extends Component {
  contents() {
    return "";
  }

  componentDidMount() {
    document
      .querySelector(".modal-backdrop")
      .addEventListener("click", this.props.closeModal);
  }

  template() {
    return /* html */ `
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div id="modal-container" class="modal-container">
        ${this.contents()}
      </div>
    </div>
    
    `;
  }
}

export default Modal;
