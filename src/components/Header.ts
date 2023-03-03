import HeaderImage from '../../templates/add-button.png';

class Header {
  #template;

  constructor() {
    this.#template = `<header class="gnb"><h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src= ${HeaderImage} alt="음식점 추가">
    </button></header>`;

    document.body.insertAdjacentHTML('afterbegin', this.#template);
  }
}

export default Header;
