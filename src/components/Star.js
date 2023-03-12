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
    const $starIcon = this.$target.querySelector(".star-icon");
    addEvent($starIcon, "click", () => this.toggleStar());
  }

  toggleStar() {
    const { name, stared, render } = this.props;
    const $modal = document.querySelector(".modal");

    this.setLocalStorage(name, stared);
    this.renderModal($modal);
    render();
  }

  setLocalStorage(name, stared) {
    const restaurantList = store.getLocalStorage();
    const targetName = restaurantList.find((obj) => obj.name === name);
    this.targetName = targetName;
    targetName.stared = !stared;
    store.setLocalStorage(restaurantList);
  }

  renderModal($modal) {
    new Modal($modal, { ...this.props, ...this.targetName });
  }
}
