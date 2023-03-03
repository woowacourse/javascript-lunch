import { $ } from '../utils/domHelpers';

class Header {
  constructor() {
    this.addEvent();
  }

  addEvent() {
    $('.gnb').addEventListener('click', (e) => {
      this.test(e);
    });
  }

  render() {
    return `
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가">
        </button>
      `;
  }

  test(e) {
    if (e.target.parentNode.type === 'button') {
      const modal = $('.modal');
      modal.classList.add('modal--open');
    }
  }
}

export default Header;
