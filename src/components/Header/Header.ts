import BaseComponent from '@/components/BaseComponent';
import AddButton from '@/assets/add-button.png';
import { openModal } from '@/utils/view';
import { $ } from '@/utils/DOM';

class Header extends BaseComponent {
  render() {
    this.#makeTitle();
    this.#makeAddButton();
    const $gnbButton = $<HTMLButtonElement>('.gnb__button');
    $gnbButton.addEventListener('click', () => {
      openModal('add');
    });
  }

  setEvent() {
    $('.gnb__title').addEventListener('click', () => {
      location.reload();
    });
  }

  #makeTitle() {
    const $title = document.createElement('h1');
    $title.classList.add('gnb__title', 'text-title');
    $title.textContent = '점심 뭐 먹지';
    this.append($title);
  }

  #makeAddButton() {
    const $addButton = document.createElement('button');
    $addButton.setAttribute('type', 'button');
    $addButton.setAttribute('aria-label', '음식점 추가');
    $addButton.classList.add('gnb__button');

    const $img = document.createElement('img');
    $img.setAttribute('src', AddButton);
    $addButton.append($img);

    this.append($addButton);
  }
}

customElements.define('header-bar', Header);

export default Header;
