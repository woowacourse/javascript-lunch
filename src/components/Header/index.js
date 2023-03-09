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
    $('#openModal').addEventListener('click', this.showAddretaurant);

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  closeModal() {
    $('#modalContainer').classList.remove('modal--open');
    $('add-restaurant').remove();
  }

  showAddretaurant() {
    $('#modalContainer').classList.add('modal--open');
    const addRestaurant = document.createElement('add-restaurant');
    $('#modalContainer').appendChild(addRestaurant);
  }
}

export default Header;
