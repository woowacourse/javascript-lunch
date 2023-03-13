import imagePaths from '../constants/imagePaths';
import Component from '../core/Component';

interface ITopNavBarProps {
  onClickAddIcon: (type: string) => void;
}

class TopNavBar extends Component<ITopNavBarProps> {
  template() {
    return `<h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button nav-add-button" aria-label="음식점 추가">
      <img src= ${imagePaths.generalIconImage.addListIcon} alt="음식점 추가" />
    </button>
    `;
  }

  setEvent() {
    const { onClickAddIcon } = this.$props;

    this.addEvent('click', '.nav-add-button', () => {
      onClickAddIcon('addRestaurant');
    });
  }
}

export default TopNavBar;
