import "./index.css";

class RestaurantDetailModal {
  $target;
  restaurantInfo;

  constructor($target, restaurantInfo) {
    this.$target = $target;
    this.restaurantInfo = restaurantInfo;

    this.render();
  }

  template() {
    return `
      ${this.restaurantInfo.name}
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setFavoriteToggleEvent() {}

  setDeleteEvent(restaurantList, toggleModal) {}

  setCloseEvent(toggleModal) {
    this.$target.querySelector("#cancel-button").addEventListener("click", toggleModal);
  }
}

export default RestaurantDetailModal;
