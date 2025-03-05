import Component from "../core/Component.js";

class Modal extends Component {
  contents() {
    return "";
  }

  template() {
    return /* html */ `
    <div class="modal ${this.props.isOpen ? "modal--open" : ""}">
      <div class="modal-backdrop"></div>
      <div id="modal-container" class="modal-container">
        ${this.contents()}
      </div>
    </div>
    
    `;
  }
}

export default Modal;
