const HEADER_TEMPLATE = `
  <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
  <button type="button" class="gnb__button" aria-label="음식점 추가">
    <img src="https://h0ngju.github.io/javascript-lunch/assets/add-button.png" alt="음식점 추가">
  </button>
`;

class Header {
  #appContainer;

  constructor({ appContainer, onClickIcon }) {
    this.#appContainer = appContainer;
    this.#createHeader();
    this.#bindEvent(onClickIcon);
  }

  #createHeader() {
    const header = document.createElement('header');
    header.classList = 'gnb';
    header.innerHTML = HEADER_TEMPLATE;
    this.#appContainer.prepend(header);
  }

  #bindEvent = (onClickIcon) => {
    const addButton = document.querySelector('.gnb__button');
    if (onClickIcon) addButton.addEventListener('click', onClickIcon);
  };
}
export default Header;
