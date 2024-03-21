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
    $('.all-matzip-tab')?.addEventListener('click', () => this.toggleMatzipTab(true));
    $('.favorite-matzip-tab')?.addEventListener('click', () => this.toggleMatzipTab(false));
  }

  toggleMatzipTab(isTotalMatzip: boolean) {
    $('.all-matzip-tab')?.classList.toggle('matzip-nav--close', !isTotalMatzip);
    $('.favorite-matzip-tab')?.classList.toggle('matzip-nav--close', isTotalMatzip);
    $('matzip-default-container')?.classList.toggle('matzip-container--close', !isTotalMatzip);
    $('matzip-favorite-container')?.classList.toggle('matzip-container--close', isTotalMatzip);
  }
}

customElements.define('matzip-nav', MatzipContainer);

export default MatzipContainer;
