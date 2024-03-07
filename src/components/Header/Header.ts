import BaseComponent from '@/components/BaseComponent';

class Header extends BaseComponent {
  render() {
    this.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="../assets/add-button.png" alt="음식점 추가" />
      </button>`;
  }
}

customElements.define('header-bar', Header);

export default Header;
