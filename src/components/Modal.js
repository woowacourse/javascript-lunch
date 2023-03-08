import AddForm from "./AddForm";
import RestaurantDetail from "./RestaurantDetail";

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
    const { render, content } = this.props;
    const $modalContainer = document.querySelector(".modal-container");

    if (content === "addForm") new AddForm($modalContainer, { render });
    if (content === "restaurantDetail") new RestaurantDetail($modalContainer, { ...this.props, render });
  }

  setEvent() {
    const $modal = document.querySelector(".modal");

    this.addEvent("click", ".modal-backdrop", () => {
      $modal.classList.toggle("modal--open");
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
