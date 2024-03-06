import ICON from '../icons';

export default class Header {
  constructor() {
    this.render();
  }

  render() {
    /*html*/
    return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="${ICON.추가버튼}" alt="음식점 추가">
      </button>
    </header>`;
  }
}
