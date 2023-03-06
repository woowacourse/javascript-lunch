import Modal from './Modal';

class Header {
  constructor() {
    this.render();
  }

  template() {
    return `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가">
      </button>
    `;
  }

  render() {
    document.querySelector('header').insertAdjacentHTML('afterbegin', this.template());
  }

  setEvent(renderModal) {
    const $addButton = document.querySelector('.gnb__button');

    $addButton.addEventListener('click', e => {
      e.preventDefault();
      renderModal();
    });
  }
}

export default Header;
