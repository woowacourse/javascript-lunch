import Component from '@res/core/Component';

interface ITopNavBarProps {
  toggleModal: () => void;
}

class TopNavBar extends Component<ITopNavBarProps> {
  template() {
    return `<h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button nav-add-button" aria-label="음식점 추가">
      <img src='./add-button.png' alt="음식점 추가" />
    </button>
    `;
  }

  setEvent() {
    const { toggleModal } = this.$props;

    this.addEvent('click', '.nav-add-button', () => {
      toggleModal();
    });
  }
}

export default TopNavBar;
