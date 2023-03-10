import "./index.css";

class Header {
  $target;
  modal;

  constructor($target, modal) {
    this.$target = $target;
    this.modal = modal;

    this.render();
  }

  template() {
    return `
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
        `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  setAddButtonEventListner(restaurantList) {
    this.$target.querySelector(".gnb__button").addEventListener("click", () => {
      this.modal.setAddRestaurantForm(restaurantList);
      this.modal.toggle();
    });
  }
}

export default Header;
