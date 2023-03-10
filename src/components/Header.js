import Modal from './Modal';

class Header {
  constructor() {
    this.$target = document.querySelector('header');
    this.render();
    this.setClickTitleEvent();
  }

  template() {
    return `
      <button class="gnb__title text-title">점심 뭐 먹지</button>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가">
      </button>
    `;
  }

  render() {
    this.$target.insertAdjacentHTML('afterbegin', this.template());
  }

  setClickTitleEvent() {
    const $headerTitle = document.querySelector('.gnb__title');
    $headerTitle.addEventListener('click', e => {
      e.preventDefault();
      window.location.reload();
    });
  }

  setOpenModalEvent(renderModal) {
    const $addButton = document.querySelector('.gnb__button');

    $addButton.addEventListener('click', e => {
      e.preventDefault();
      renderModal();
    });
  }
}

export default Header;
