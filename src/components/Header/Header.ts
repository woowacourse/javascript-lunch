import BaseComponent from '@/components/BaseComponent';
import AddButton from '@/assets/add-button.png';
import { blockModalBodyScroll } from '@/utils/view';
import { ErrorMessage } from '@/constants/Message';

class Header extends BaseComponent {
  render() {
    this.#makeTitle();
    this.#makeAddButton();
    const $gnbButton = document.querySelector('.gnb__button');
    if (!$gnbButton) {
      return console.error(ErrorMessage.NULL_SELECTOR($gnbButton));
    }
    document.querySelector('.gnb__button')?.addEventListener('click', () => {
      document.querySelector('.modal')?.classList.add('modal--open');
      blockModalBodyScroll();
    });
  }

  setEvent() {
    const $gnbTitle = document.querySelector('.gnb__title');
    if (!$gnbTitle) {
      return console.error(ErrorMessage.NULL_SELECTOR($gnbTitle));
    }
    document.querySelector('.gnb__title')?.addEventListener('click', () => {
      location.reload();
    });
  }

  #makeTitle() {
    const $title = document.createElement('h1');
    $title.classList.add('gnb__title', 'text-title');
    $title.textContent = '점심 뭐 먹지';
    $title.addEventListener('click', () => {});
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
