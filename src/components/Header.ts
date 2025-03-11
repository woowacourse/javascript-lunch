import Component from '../core/Component.ts';

interface HeaderProps {
  title: string;
}

export default class Header extends Component<null, HeaderProps> {
  template() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">${this.props?.title ?? ''}</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="images/add-button.png" alt="음식점 추가" />
        </button>
      </header>
    `;
  }

  attachEventListener() {
    this.element?.addEventListener('click', () => {
      document.querySelector('#restaurant-add-modal')?.classList.add('modal--open');
    });
  }
}
