import AddButtonIcon from '../../assets/svg/add-button.svg';
import './style.css';

class TopBarAddBtn {
  constructor() {
    this.#injectHTML();
  }

  #injectHTML() {
    const topBarEl = document.querySelector('.top-bar');

    topBarEl?.appendChild(this.#makeButtonElement());
  }
  // TODO: 리팩토링으로 분리
  #makeButtonElement() {
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('class', 'top-bar__button');

    const html = `
    <img src=${AddButtonIcon} alt="음식점 추가 버튼"/>
    `;

    buttonEl.innerHTML = html;

    buttonEl.addEventListener('click', () => {
      console.log('버튼 성공');
    });

    return buttonEl;
  }
}

export default TopBarAddBtn;
