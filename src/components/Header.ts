import ImagePath from '../../templates/add-button.png';

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
}

export default new Header();
