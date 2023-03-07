import Component from '../Component';

interface HeaderProps {
  toggleModal: () => void;
}

class Header extends Component {
  props: HeaderProps;

  constructor($parent: HTMLElement, props: HeaderProps) {
    super({ $parent, tagName: 'header', className: 'gnb' });
    this.props = props;
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
