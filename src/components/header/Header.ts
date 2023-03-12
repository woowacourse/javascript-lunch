import CustomElement from '../CustomElement';

class Header extends CustomElement {
  renderTemplate = () => {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button id="modal-open-button" type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="assets/add-button.png" alt="음식점 추가" />
        </button>
      </header>
    `;
  };

  render = () => {
    super.render();

    this.initEventHandlers();
  };

  clickOpenModalButton = () => {
    this.dispatchEvent(new CustomEvent('openRegisterRestauranModal', { bubbles: true }));
  };

  initEventHandlers = () => {
    const $openModalButton = this.querySelector('#modal-open-button');

    if (!$openModalButton) return;

    $openModalButton.addEventListener('click', this.clickOpenModalButton);
  };
}

customElements.define('r-header', Header);

export default Header;
