class Header {
  $target;

  constructor($target) {
    this.$target = $target;
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

  setAddButtonEventListner(callback) {
    this.$target.querySelector(".gnb__button").addEventListener("click", callback);
  }
}

export default Header;
