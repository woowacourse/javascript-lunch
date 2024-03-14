import DOM from '../utils/DOM';

const { $, $$ } = DOM;

class MatzipContainer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
        <div class="matzip-nav-container">
            <div class="total-matzip">모든 음식점</div>
            <div class="favorite-matzip matzip-nav--close">자주 가는 음식점</div>
        </div>
        `;
    this.setEvent();
  }

  setEvent() {
    this.openTotalMatzip();
    this.openFavoriteMatzip();
  }

  openTotalMatzip() {
    $('.total-matzip')?.addEventListener('click', () => {
      $('.total-matzip')?.classList.remove('matzip-nav--close');
      $('.favorite-matzip')?.classList.add('matzip-nav--close');
      $('matzip-favorite-container')?.classList.add('container--close');
      $('matzip-default-container')?.classList.remove('container--close');
    });
  }

  openFavoriteMatzip() {
    $('.favorite-matzip')?.addEventListener('click', () => {
      $('.total-matzip')?.classList.add('matzip-nav--close');
      $('.favorite-matzip')?.classList.remove('matzip-nav--close');
      $('matzip-favorite-container')?.classList.remove('container--close');
      $('matzip-default-container')?.classList.add('container--close');
    });
  }
}

customElements.define('matzip-divide', MatzipContainer);

export default MatzipContainer;
