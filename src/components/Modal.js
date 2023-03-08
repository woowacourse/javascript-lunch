import AddForm from "./AddForm";

export default class Modal {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  template() {
    return `
        <div class="modal-backdrop"></div>
        <div class="modal-container"></div>
        `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {
    const { render } = this.props;
    const $modalContainer = document.querySelector(".modal-container");

    if (this.props.content === "addForm") new AddForm($modalContainer, { render });
  }

  setEvent() {
    this.addEvent("click", ".modal-backdrop", () => {
      this.$target.classList.toggle("modal--open");
    });
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      const target = event.target;
      if (!target.closest(selector)) return false;
      callback(event);
    });
  }
}
