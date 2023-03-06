import Component from '../Component';

interface HeaderProps {
  toggleModal: () => void;
}

interface HeaderState {}

class Header extends Component<HeaderProps, HeaderState> {
  constructor($parent: HTMLElement, props: HeaderProps) {
    super({ $parent, props, tagName: 'header', initialState: {} });
    this.$wrapper.className = 'gnb';
  }

  drawInnerHTML() {
    return `
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
      </button>
    `;
  }

  addEvent() {
    this.$('button')?.addEventListener('click', this.props.toggleModal);
  }
}

export default Header;
