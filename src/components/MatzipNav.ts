import DOM from '../utils/DOM';

const { $, $$ } = DOM;

class MatzipContainer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
        <div class="matzip-nav-container">
            <div class="all-matzip-tab">모든 음식점</div>
            <div class="favorite-matzip-tab matzip-nav--close">자주 가는 음식점</div>
        </div>
        `;
    this.setEvent();
  }

  setEvent() {
    this.openTotalMatzip();
    this.openFavoriteMatzip();
  }

  openTotalMatzip() {
    $('.all-matzip-tab')?.addEventListener('click', () => {
      $('.all-matzip-tab')?.classList.remove('matzip-nav--close');
      $('.favorite-matzip-tab')?.classList.add('matzip-nav--close');
      $('matzip-default-container')?.classList.remove('matzip-container--close');
      $('matzip-favorite-container')?.classList.add('matzip-container--close');
    });
  }

  openFavoriteMatzip() {
    $('.favorite-matzip-tab')?.addEventListener('click', () => {
      $('.all-matzip-tab')?.classList.add('matzip-nav--close');
      $('.favorite-matzip-tab')?.classList.remove('matzip-nav--close');
      $('matzip-default-container')?.classList.add('matzip-container--close');
      $('matzip-favorite-container')?.classList.remove('matzip-container--close');
    });
  }
}

customElements.define('matzip-nav', MatzipContainer);

export default MatzipContainer;
