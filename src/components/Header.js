import { $ } from '../utils/common';

class Header {
  constructor($target) {
    this.$target = $target;
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
    this.$target.insertAdjacentHTML('afterbegin', this.template());
  }

  setEvent(addModalRender, setState, add) {
    const addButton = $('.gnb__button');
    addButton.addEventListener('click', () => {
      addModalRender(setState, add);
    });
  }
}

export default Header;
