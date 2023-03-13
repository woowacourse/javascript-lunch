import HeaderButton from './HeaderButton';

const Header = {
  template() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        ${HeaderButton.template()}
      </header>`;
  },
  setEvent() {
    HeaderButton.setEvent();
  },
};

export default Header;
