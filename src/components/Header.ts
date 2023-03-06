import ImagePath from '../../templates/add-button.png';
import { $ } from '../util/dom';

class Header {
  template = () => `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src= ${ImagePath} alt="음식점 추가">
      </button>
    </header>`;

  render = (target: HTMLElement) => {
    target.insertAdjacentHTML('afterbegin', this.template());
  };

  setButtonHandler = (handler: () => void) => {
    $('.gnb__button')?.addEventListener('click', (event) => {
      handler();
    });
  };
}

export default new Header();
