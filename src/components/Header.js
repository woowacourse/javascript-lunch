class Header {
  constructor($target) {
    this.$target = $target;
  }

  template() {
    return `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가">
      </button>
    `;
  }

  render(modal) {
    this.$target.insertAdjacentHTML('afterbegin', this.template());
    this.setEvent(modal);
  }

  setEvent(modal) {
    const $addButton = document.querySelector('.gnb__button');

    $addButton.addEventListener('click', e => {
      e.preventDefault();
      modal.render();
    });
  }
}

export default Header;
