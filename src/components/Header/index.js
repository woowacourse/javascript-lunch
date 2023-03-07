import './index.css';
import buttonImg from '../../assets/add-button.png';
import { $ } from '../../utils';

class Header extends HTMLElement {
  connectedCallback() {
    this.render();
    this.modalHandler();
  }

  render() {
    this.innerHTML = `
    <header id="head" class="gnb">
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button
      type="button"
      id="openModal"
      class="gnb__button"
      aria-label="음식점 추가"
    >
      <img src="${buttonImg}" alt="음식점 추가" />
    </button>
    </header>
  `;
  }

  modalHandler() {
    $('#openModal').addEventListener('click', this.toggleModal);

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.toggleModal();
      }
    });
  }

  toggleModal() {
    $('.modal').classList.toggle('modal--open');
  }
}

export default Header;
