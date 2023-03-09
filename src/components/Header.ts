import { $ } from '../utils/domSelectors';

class Header {
  addEvent(openModal: CallableFunction) {
    const addButton = $<HTMLButtonElement>('.gnb__button');

    addButton.addEventListener('click', () => {
      openModal();
    });
  }

  create() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button">
          <img src="./add-button.png" alt="음식점 추가">
        </button>
      </header>`;
  }

  render(parent: Element) {
    parent.insertAdjacentHTML('beforeend', this.create());
  }
}

export default new Header();
