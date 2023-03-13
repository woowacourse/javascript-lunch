import { CLASS, CONTENT } from "../constant/variables";
import { addEvent } from "../util/addEvent";
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

    if (content === CONTENT.ADD_FORM) new AddForm($modalContainer, { render });
    if (content === CONTENT.RESTAURANT_DETAIL) new RestaurantDetail($modalContainer, { ...this.props });
  }

  setEvent() {
    const $modal = document.querySelector(".modal");

    const $modalBackdrop = this.$target.querySelector(".modal-backdrop");
    addEvent($modalBackdrop, "click", () => {
      $modal.classList.toggle(CLASS.MODAL_OPEN);
    });
  }
}
