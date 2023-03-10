import { addEvent } from "../util/addEvent";
import store from "../util/store";
import Modal from "./Modal";

export default class Star {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  template() {
    const { stared } = this.props;
    return `<img src="./favorite-icon-${stared ? "filled" : "lined"}.png" class="star-icon" />`;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {
    const { name, stared, render } = this.props;
    const $modal = document.querySelector(".modal");

    addEvent(this.$target, "click", ".star-icon", () => {
      const restaurantList = store.getLocalStorage();
      const targetName = Array.prototype.find.call(restaurantList, (obj) => obj.name === name);
      targetName.stared = !stared;
      store.setLocalStorage(restaurantList);
      render();
      new Modal($modal, { ...this.props, ...targetName });
    });
  }
}
