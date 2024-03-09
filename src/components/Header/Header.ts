import BaseComponent from '@/components/BaseComponent';
import AddButton from '@/assets/add-button.png';

class Header extends BaseComponent {
  render() {
    const $h1Element = document.createElement('h1');
    $h1Element.classList.add('gnb__title', 'text-title');
    $h1Element.textContent = '점심 뭐 먹지';
    this.append($h1Element);

    const $addButton = document.createElement('button');
    $addButton.setAttribute('type', 'button');
    $addButton.setAttribute('aria-label', '음식점 추가');
    $addButton.classList.add('gnb__button');

    const $img = document.createElement('img');
    $img.setAttribute('src', AddButton);
    $addButton.append($img);

    this.append($addButton);

    // this.innerHTML = `
    //   <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    //   <button type="button" class="gnb__button" aria-label="음식점 추가">
    //     <img src=${AddButton} alt="음식점 추가" />
    //   </button>`;

    document.querySelector('.gnb__button')?.addEventListener('click', () => {
      document.querySelector('.modal')?.classList.add('modal--open');
    });
  }
}

customElements.define('header-bar', Header);

export default Header;
