import BaseComponent from '@/components/BaseComponent';
import AddButton from '@/assets/add-button.png';
import './Header.css';

class Header extends BaseComponent {
  render() {
    this.innerHTML = `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src=${AddButton} alt="음식점 추가" />
      </button>`;

    document.querySelector('.gnb__button')?.addEventListener('click', () => {
      document.querySelector('.modal')?.classList.add('modal--open');
    });
  }
}

customElements.define('header-bar', Header);

export default Header;
