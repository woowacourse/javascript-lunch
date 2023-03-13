import ModalButton from './ModalButton';

const Header = {
  template() {
    const $app = document.querySelector('#app');
    if (!$app) return;

    const template = `
    <header class="gnb">
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      ${ModalButton.template()}
    </header>`;

    $app.innerHTML = template;

    ModalButton.setEvent();

    return template;
  },
};

export default Header;
