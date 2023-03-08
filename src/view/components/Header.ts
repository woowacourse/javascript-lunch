import { $ } from '../../utils/querySelector';

class Header {
  #root;

  constructor($root: HTMLElement) {
    this.#root = $root;
  }

  #template() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가">
        </button>
      </header>
    `;
  }

  render() {
    this.#root.insertAdjacentHTML('beforeend', this.#template());

    this.setEvent();
  }

  setEvent() {
    $('.gnb__button')?.addEventListener('click', () => {
      $('.modal')?.classList.add('modal--open');
    });
  }
}

export default Header;
