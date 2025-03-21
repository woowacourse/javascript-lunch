import Component from "../Component.js";

class Modal extends Component {
  constructor($target, props) {
    super($target, props);
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    document.body.style.overflow = "hidden";
  }

  modalClose() {
    document.body.style.overflow = "";
    document.querySelector(".modal")?.classList.toggle("modal--open");
  }
}

export default Modal;
